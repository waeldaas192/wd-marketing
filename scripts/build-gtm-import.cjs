// Generate portable GTM files. This does not connect to or publish a Google account.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'docs/gtm');
const parameter = (key, value, type = 'TEMPLATE') => ({type, key, value: String(value)});
const dlv = key => '{{WD - DLV - ' + key + '}}';
const keys = ['page_location', 'page_path', 'page_referrer', 'form_id', 'step', 'lead_method', 'contact_method'];
const events = [
  ['wd_page_view', 'page_view', []],
  ['wd_form_start', 'form_start', ['form_id']],
  ['wd_form_step', 'form_step', ['form_id', 'step']],
  ['wd_generate_lead', 'generate_lead', ['form_id', 'lead_method']],
  ['wd_contact_click', 'contact_click', ['contact_method']],
  ['wd_contact_cta_click', 'contact_cta_click', []]
];
const trigger = ['wd_analytics_ready', ...events.map(x => x[0])].map((name, i) => ({
  triggerId: String(i + 1), name: 'WD - Event - ' + name, type: 'CUSTOM_EVENT',
  customEventFilter: [{type: 'EQUALS', parameter: [parameter('arg0', '{{_event}}'), parameter('arg1', name)]}]
}));
const variable = keys.map((key, i) => ({
  variableId: String(i + 1), name: 'WD - DLV - ' + key, type: 'v',
  parameter: [parameter('name', key), parameter('dataLayerVersion', 2, 'INTEGER')]
}));
variable.push(
  {variableId: '8', name: 'WD - GA4 Measurement ID', type: 'c', parameter: [parameter('value', 'G-P2D95M1T98')]},
  {variableId: '9', name: 'WD - Boolean false', type: 'jsm', parameter: [parameter('javascript', 'function() { return false; }')]},
  {variableId: '10', name: 'WD - Cookie lifetime seconds', type: 'jsm', parameter: [parameter('javascript', 'function() { return 15552000; }')]}
);
const consentSettings = {consentStatus: 'NEEDED', consentType: {type: 'LIST', list: [{type: 'TEMPLATE', value: 'analytics_storage'}]}};
const googleName = 'WD - Google tag - GA4';
const config = {
  send_page_view: '{{WD - Boolean false}}', cookie_expires: '{{WD - Cookie lifetime seconds}}',
  cookie_update: '{{WD - Boolean false}}', allow_google_signals: '{{WD - Boolean false}}',
  allow_ad_personalization_signals: '{{WD - Boolean false}}', page_location: dlv('page_location'), page_referrer: dlv('page_referrer')
};
const tag = [{
  tagId: '1', name: googleName, type: 'googtag',
  parameter: [parameter('tagId', '{{WD - GA4 Measurement ID}}'), {
    type: 'LIST', key: 'configSettingsTable', list: Object.entries(config).map(([key, value]) => ({
      type: 'MAP', map: [parameter('parameter', key), parameter('parameterValue', value)]
    }))
  }], firingTriggerId: ['1'], tagFiringOption: 'ONCE_PER_LOAD', consentSettings
}];
events.forEach(([websiteEvent, eventName, extra], i) => tag.push({
  tagId: String(i + 2), name: 'WD - GA4 - ' + eventName, type: 'gaawe',
  parameter: [parameter('measurementIdOverride', '{{WD - GA4 Measurement ID}}'), parameter('eventName', eventName),
    parameter('sendEcommerceData', false, 'BOOLEAN'), {
      type: 'LIST', key: 'eventParameters', list: [...keys.slice(0, 3), ...extra].map(key => ({
        type: 'MAP', map: [parameter('name', key), parameter('value', dlv(key))]
      }))
    }],
  firingTriggerId: [String(i + 2)], tagFiringOption: 'ONCE_PER_EVENT',
  setupTag: [{tagName: googleName, stopOnSetupFailure: true}], consentSettings
}));
// Local entity IDs are references within this import, not real account IDs.
// The consent template is imported separately, avoiding a container-specific custom tag type.
fs.writeFileSync(path.join(dir, 'WD-Marketing-GA4-import.json'), JSON.stringify({
  exportFormatVersion: 2,
  containerVersion: {container: {name: 'WD Marketing', publicId: 'GTM-MJL3LG77', usageContext: ['WEB']}, tag, trigger, variable}
}, null, 2) + '\n');

const atom = value => typeof value === 'boolean' ? {type: 8, boolean: value} : {type: 1, string: value};
const record = value => ({type: 3, mapKey: Object.keys(value).map(atom), mapValue: Object.values(value).map(atom)});
const permission = (publicId, key, values) => ({
  instance: {key: {publicId, versionId: '1'}, param: [{key, value: {type: 2, listItem: values}}]},
  clientAnnotations: {isEditedByUser: true}, isRequired: true
});
const permissions = [
  permission('access_consent', 'consentTypes', ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization',
    'functionality_storage', 'personalization_storage', 'security_storage'].map(consentType => record({consentType, read: false, write: true}))),
  permission('access_globals', 'keys', ['wdOnConsentChange', 'wdMeasurementContext'].map(key => record({key, read: false, write: false, execute: true}))),
  permission('write_data_layer', 'keyPatterns', ['ads_data_redaction', 'url_passthrough', 'allow_google_signals',
    'allow_ad_personalization_signals', 'send_page_view', 'cookie_expires', 'cookie_update', 'page_location', 'page_referrer'].map(atom))
];
const info = {type: 'TAG', id: 'cvt_WDConsent', version: 1, displayName: 'WD Marketing - consent',
  description: 'Native consent bridge for the WD Marketing website. No analytics requests are sent by this template.',
  containerContexts: ['WEB'], securityGroups: []};
const section = (name, value) => '___' + name + '___\n\n' + (typeof value === 'string' ? value.trim() : JSON.stringify(value, null, 2)) + '\n\n';
fs.writeFileSync(path.join(dir, 'WD-Marketing-consent.tpl'),
  section('INFO', info) + section('TEMPLATE_PARAMETERS', []) +
  section('SANDBOXED_JS_FOR_WEB_TEMPLATE', fs.readFileSync(path.join(dir, 'consent-template.js'), 'utf8')) +
  section('WEB_PERMISSIONS', permissions) + section('TESTS', 'scenarios: []') + section('NOTES', 'Prepared for GTM-MJL3LG77. Import and validate in GTM Preview before publishing.')
);
console.log('Prepared GA4 import: 7 tags, 7 triggers, 10 variables; separate native consent template. Not published.');

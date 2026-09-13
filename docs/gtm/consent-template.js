// Paste into a new GTM Custom Tag Template. See MEASUREMENT-SETUP.md for permissions.
// Run once per page using Consent Initialization - All Pages.
const setDefaultConsentState = require('setDefaultConsentState');
const updateConsentState = require('updateConsentState');
const callInWindow = require('callInWindow');
const gtagSet = require('gtagSet');

setDefaultConsentState({
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted'
});
gtagSet('ads_data_redaction', true);
gtagSet('url_passthrough', false);
gtagSet('allow_google_signals', false);
gtagSet('allow_ad_personalization_signals', false);
gtagSet('send_page_view', false);
gtagSet('cookie_expires', 15552000);
gtagSet('cookie_update', false);
const page = callInWindow('wdMeasurementContext');
gtagSet('page_location', page.page_location);
gtagSet('page_referrer', page.page_referrer);
callInWindow('wdOnConsentChange', function(state) {
  updateConsentState({
    analytics_storage: state.analytics === true ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
});
data.gtmOnSuccess();

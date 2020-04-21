import VueLib from 'vue'
import * as Sentry from '@sentry/browser'
import { Dedupe, ExtraErrorData, ReportingObserver, RewriteFrames, Vue } from '@sentry/integrations'

export default function (ctx, inject) {
  const opts = Object.assign({}, {"dsn":"https:\u002F\u002F7875761f76d6423197bd28d911e2f632@o376878.ingest.sentry.io\u002F5206754","environment":"production"}, {
    integrations: [
      new Dedupe({}),
      new ExtraErrorData({}),
      new ReportingObserver({}),
      new RewriteFrames({}),
      new Vue({Vue: VueLib, ...{"attachProps":true}})
    ]
  })

  // Initialize sentry
  Sentry.init(opts)

  // Inject Sentry to the context as $sentry
  inject('sentry', Sentry)
  ctx.$sentry = Sentry
}

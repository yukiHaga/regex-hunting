Sentry.init do |config|
  config.dsn = 'https://066c71526a474c319038e701f36eb1df:7c9b85877458470998c02656477663c0@o1168927.ingest.sentry.io/6261223'
  config.breadcrumbs_logger = [:active_support_logger]

  # To activate performance monitoring, set one of these options.
  # We recommend adjusting the value in production:
  config.traces_sample_rate = 0.5
  # or
  config.traces_sampler = ->(_context) do
    true
  end
end

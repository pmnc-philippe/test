const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/bdd/test-report.json',
  output: 'reports/bdd/test-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '0.3.2',
    'Test Environment': 'STAGING',
    Browser: 'Chrome',
    Platform: 'Linux',
    Parallel: 'Scenarios',
    Executed: 'Remote',
  },
};

reporter.generate(options);

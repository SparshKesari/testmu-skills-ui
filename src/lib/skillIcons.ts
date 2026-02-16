/**
 * Logo/icon for each skill card. Uses Simple Icons (jsDelivr) where available,
 * otherwise a consistent fallback icon. All logos rendered in same size/container.
 */
const SIMPLE_ICONS_CDN = "https://cdn.jsdelivr.net/npm/simple-icons@11/icons";

/** skill path → Simple Icons slug. Only slugs known to exist in simple-icons. */
const SKILL_ICON_SLUGS: Record<string, string> = {
  "selenium-automation-skill": "selenium",
  "playwright-automation-skill": "playwright",
  "cypress-automation-skill": "cypress",
  "jest-testing-skill": "jest",
  "pytest-testing-skill": "python",
  "junit-testing-skill": "java",
  "testng-testing-skill": "java",
  "appium-automation-skill": "appium",
  "puppeteer-automation-skill": "puppeteer",
  "mocha-testing-skill": "mocha",
  "vitest-testing-skill": "vite",
  "cucumber-automation-skill": "cucumber",
  "espresso-automation-skill": "android",
  "flutter-testing-skill": "flutter",
  "xcuitest-automation-skill": "apple",
  "detox-automation-skill": "react",
  "xunit-testing-skill": "dotnet",
  "rspec-testing-skill": "ruby",
  "nunit-testing-skill": "dotnet",
  "mstest-testing-skill": "microsoft",
  "jasmine-testing-skill": "jasmine",
  "phpunit-testing-skill": "php",
  "robot-framework-skill": "robotframework",
  "behat-automation-skill": "php",
  "behave-automation-skill": "python",
  "capybara-automation-skill": "ruby",
  "codeception-testing-skill": "php",
  "geb-automation-skill": "groovy",
  "laravel-dusk-skill": "laravel",
  "lettuce-testing-skill": "python",
  "nemojs-automation-skill": "nodedotjs",
  "protractor-automation-skill": "angular",
  "selenide-automation-skill": "java",
  "serenity-bdd-skill": "java",
  "smartui-testing-skill": "selenium",
  "specflow-automation-skill": "dotnet",
  "testunit-ruby-skill": "ruby",
  "unittest-testing-skill": "python",
  "hyperexecute-skill": "docker",
  "cicd-pipeline-skill": "github",
  "test-framework-migration-skill": "git",
  "webdriverio-automation-skill": "webdriverio",
  "nightwatchjs-automation-skill": "nightwatch",
  "testcafe-automation-skill": "testcafe",
  "karma-testing-skill": "karma",
  "gauge-automation-skill": "gauge",
};

export function getSkillIconUrl(skillPath: string): string | null {
  const slug = SKILL_ICON_SLUGS[skillPath];
  if (!slug) return null;
  return `${SIMPLE_ICONS_CDN}/${slug}.svg`;
}


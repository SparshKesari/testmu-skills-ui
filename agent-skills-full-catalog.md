### 1. Selenium Skill

**One-liner:** Production-grade Selenium WebDriver automation with cross-browser cloud support across Java, Python, JS, C#, and Ruby.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/selenium-skill

**When to Apply:**
Reference this skill when writing Selenium WebDriver tests, automating browsers with ChromeDriver/GeckoDriver, running cross-browser tests on Selenium Grid, or migrating existing Selenium scripts to cloud execution. Triggers on mentions of "Selenium", "WebDriver", "RemoteWebDriver", "cross-browser", "Selenium Grid".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Locator Strategy | CRITICAL | locator- |
| 2 | Wait Strategy | CRITICAL | wait- |
| 3 | Page Object Model | HIGH | pom- |
| 4 | Cloud Integration | HIGH | cloud- |
| 5 | Driver Management | MEDIUM-HIGH | driver- |
| 6 | Data-Driven Testing | MEDIUM | data- |
| 7 | Reporting & CI/CD | MEDIUM | ci- |
| 8 | Advanced Interactions | LOW-MEDIUM | advanced- |

**Quick Reference:**

1. **Locator Strategy (CRITICAL)**
   - locator-id-first — Use By.id() as most stable locator
   - locator-css-over-xpath — Prefer CSS selectors over XPath for speed and readability
   - locator-no-absolute-xpath — Never use fragile absolute XPaths like //div[3]/span[2]/a
   - locator-data-attributes — Use data-testid for elements without stable IDs

2. **Wait Strategy (CRITICAL)**
   - wait-explicit-only — Use WebDriverWait with ExpectedConditions exclusively
   - wait-no-thread-sleep — Never use Thread.sleep() (flaky, slow)
   - wait-no-implicit-mix — Never mix implicit and explicit waits (unpredictable)
   - wait-fluent-retry — Use FluentWait with polling for complex scenarios

3. **Page Object Model (HIGH)**
   - pom-locator-separation — Locators in page class, assertions in test class
   - pom-base-page — 20+ helper methods for Shadow DOM, iframes, alerts, Angular/jQuery waits
   - pom-factory-pattern — Thread-safe DriverFactory for multi-browser support

4. **Cloud Integration (HIGH)**
   - cloud-env-credentials — LT_USERNAME and LT_ACCESS_KEY from environment variables
   - cloud-lt-options — Configure LT:Options for platform, build, video, network
   - cloud-status-report — Report pass/fail to TestMu AI dashboard via JavascriptExecutor

**Playbook Deep Dive (14 sections):**
§1 Thread-Safe DriverFactory · §2 Configuration Management · §3 Production BasePage · §4 Page Object Example · §5 Smart Wait Strategies · §6 Data-Driven Testing (CSV, Excel) · §7 Screenshot & Reporting · §8 Allure Reporting · §9 CI/CD Integration · §10 Parallel Execution · §11 Advanced Element Interactions · §12 Retry Mechanism · §13 Debugging Table (11+ problems) · §14 Best Practices (17 items)


The agent loads from 9 on-demand reference files (`cloud-integration.md`, `page-object-model.md`, `python-patterns.md`, `javascript-patterns.md`, `csharp-patterns.md`, `ruby-patterns.md`, `php-patterns.md`, `debugging-common-issues.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 2. Playwright Skill

**One-liner:** Production-grade Playwright browser automation with auto-wait assertions, API mocking, visual regression, and real mobile device testing across TypeScript, JS, Python, Java, and C#.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/playwright-skill

**When to Apply:**
Reference this skill when writing E2E tests with Playwright, automating browsers with auto-wait assertions, testing on real mobile devices, mocking APIs, performing visual regression, or running cross-browser tests. Triggers on "Playwright", "E2E test", "browser test", "cross-browser", "test my app", "real device".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Selector Strategy | CRITICAL | selector- |
| 2 | Assertion Pattern | CRITICAL | assert- |
| 3 | Page Object Model | HIGH | pom- |
| 4 | Cloud & Mobile | HIGH | cloud- |
| 5 | Network Interception | MEDIUM-HIGH | network- |
| 6 | Visual Regression | MEDIUM | visual- |
| 7 | Auth & Fixtures | MEDIUM | auth- |
| 8 | CI/CD & Debugging | LOW-MEDIUM | ci- |

**Quick Reference:**

1. **Selector Strategy (CRITICAL)**
   - selector-get-by-role — Use getByRole('button', { name: 'Submit' }) first (accessible, resilient)
   - selector-get-by-label — Use getByLabel('Email') for form fields
   - selector-get-by-test-id — Use getByTestId only as last resort
   - selector-no-raw-css — Never use raw CSS/XPath unless matching third-party widgets

2. **Assertion Pattern (CRITICAL)**
   - assert-web-first — Use auto-retrying assertions: await expect(locator).toBeVisible()
   - assert-no-manual-check — Never use const text = await page.textContent(); expect(text)
   - assert-no-hard-wait — Never use page.waitForTimeout(3000)

3. **Cloud & Mobile (HIGH)**
   - cloud-cdp-websocket — Connect via wss://cdp.lambdatest.com/playwright
   - cloud-hyperexecute-projects — Use project format for parallel cloud runs
   - cloud-mobile-webkit — iOS always uses webkit, never chromium
   - cloud-status-report — Report pass/fail via lambdatest_action

**Playbook Deep Dive (16 sections):**
§1 Production Configuration · §2 Auth Fixture Reuse · §3 Page Object Model · §4 Advanced Network Interception · §5 Visual Regression Testing · §6 File Upload & Download · §7 Multi-Tab, Popup & Dialog Handling · §8 Geolocation, Permissions & Device Emulation · §9 Custom Test Fixtures · §10 API Testing with Playwright · §11 Accessibility Testing (axe-core) · §12 Parallel & Sharding · §13 CI/CD Integration · §14 Debugging Toolkit · §15 Debugging Table (10 problems) · §16 Best Practices (17 items)


The agent loads from 9 on-demand reference files (`cloud-integration.md`, `page-object-model.md`, `mobile-testing.md`, `debugging-flaky.md`, `api-mocking-visual.md`, `python-patterns.md`, `java-patterns.md`, `csharp-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices. The skill also includes utility scripts and templates: `scripts/scaffold-project.sh`, `scripts/validate-config.py`, and `templates/`.

---

### 3. Cypress Skill

**One-liner:** Production-grade Cypress E2E and component testing with command chaining, network interception, and custom commands in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/cypress-skill

**When to Apply:**
Reference this skill when writing Cypress tests, setting up component testing for React/Vue/Angular, configuring network interception with cy.intercept, or running tests on TestMu AI cloud. Triggers on "Cypress", "cy.visit", "cy.get", "cy.intercept", "component test".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Command Chaining | CRITICAL | chain- |
| 2 | Wait Strategy | CRITICAL | wait- |
| 3 | Selector Strategy | HIGH | selector- |
| 4 | Network Interception | HIGH | network- |
| 5 | Auth & Session | MEDIUM-HIGH | auth- |
| 6 | Component Testing | MEDIUM | component- |
| 7 | Custom Commands | MEDIUM | command- |
| 8 | CI/CD & Debugging | LOW-MEDIUM | ci- |

**Quick Reference:**

1. **Command Chaining (CRITICAL)**
   - chain-no-async-await — Never use async/await with cy commands
   - chain-no-variable-assign — Never assign cy.get() to a variable for later use
   - chain-then-pattern — Use .then() for value extraction when needed

2. **Wait Strategy (CRITICAL)**
   - wait-intercept-alias — Use cy.intercept() + cy.wait('@alias') instead of cy.wait(number)
   - wait-should-retry — Use .should() chains for auto-retrying assertions

3. **Network Interception (HIGH)**
   - network-stub-api — Stub API responses with cy.intercept for deterministic tests
   - network-alias-wait — Always alias intercepts and wait for them before assertions
   - network-request-body — Verify request payloads via cy.wait('@alias').its('request.body')

**Playbook Deep Dive (15 sections):**
§1 Production Configuration · §2 Auth with cy.session() · §3 Page Object / App Actions Pattern · §4 Network Interception Patterns · §5 Component Testing · §6 Custom TypeScript Commands · §7 Database Reset & Seeding · §8 Time & Clock Control · §9 File Operations · §10 iframe & Shadow DOM · §11 Accessibility Testing · §12 Visual Regression (Percy) · §13 CI/CD Integration · §14 Debugging Table (11 problems) · §15 Best Practices (15 items)


The agent loads from 5 on-demand reference files (`cloud-integration.md`, `component-testing.md`, `custom-commands.md`, `debugging-flaky.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 4. WebdriverIO Skill

**One-liner:** WebdriverIO (WDIO) automation with page objects, custom commands, and TestMu AI cloud integration in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/webdriverio-skill

**When to Apply:**
Reference when writing WDIO tests, configuring wdio.conf.js, using $ and $$ selectors, or integrating with Appium service for mobile testing. Triggers on "WebdriverIO", "WDIO", "wdio.conf", "browser.$".

**Playbook Deep Dive (13 sections):**
§1 Production Configuration · §2 Page Object Model · §3 Custom Commands · §4 Network Mocking (DevTools Protocol) · §5 File Operations · §6 Multi-Tab, iFrame & Shadow DOM · §7 Visual Regression Testing · §8 API Testing · §9 Mobile Testing (Appium Service) · §10 LambdaTest Integration · §11 CI/CD Integration · §12 Debugging Table · §13 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 5. Puppeteer Skill

**One-liner:** Puppeteer Chrome automation with page manipulation, network interception, screenshots/PDF generation, and performance metrics in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/puppeteer-skill

**When to Apply:**
Reference when automating Chrome/Chromium with Puppeteer, generating PDFs or screenshots, intercepting network requests, or scraping web content. Triggers on "Puppeteer", "page.$", "puppeteer.launch".

**Playbook Deep Dive (12 sections):**
§1 Production Setup & Configuration · §2 Page Object Pattern · §3 Network Interception & Mocking · §4 Wait Strategies · §5 Screenshots, PDF & Media · §6 Authentication & Cookies · §7 iFrame, Dialog & File Operations · §8 Performance & Metrics · §9 Accessibility Testing · §10 CI/CD Integration · §11 Debugging Table · §12 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 6. TestCafe Skill

**One-liner:** TestCafe cross-browser testing with no WebDriver dependency, built-in wait mechanism, and fixture/test structure in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/testcafe-skill

**When to Apply:**
Reference when writing TestCafe tests that need no WebDriver installation, using fixture/test structure, or testing across multiple browsers without additional drivers. Triggers on "TestCafe", "test cafe", "fixture/test".

**Playbook Deep Dive (9 sections):**
§1 Production Configuration · §2 Page Model Pattern with Roles · §3 Request Mocking & Logging · §4 Client Functions & Browser Interaction · §5 Advanced Test Patterns · §6 LambdaTest Integration · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 7. Nightwatch.js Skill

**One-liner:** Nightwatch.js browser automation with built-in assertions, command chaining, component testing (React/Vue), and cloud integration in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/nightwatchjs-skill

**When to Apply:**
Reference when writing Nightwatch tests with built-in assertion library, creating page objects for Nightwatch, or setting up component testing for React/Vue. Triggers on "Nightwatch", "nightwatch.conf", "browser.assert".

**Playbook Deep Dive (10 sections):**
§1 Production Configuration · §2 Page Objects · §3 Test Patterns · §4 Custom Commands · §5 Custom Assertions · §6 API Testing (Built-in) · §7 Component Testing (React/Vue) · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 8. Capybara Skill

**One-liner:** Ruby acceptance testing DSL with RSpec integration, SitePrism page objects, and database cleaning strategies for web application testing.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/capybara-skill

**When to Apply:**
Reference when writing Ruby acceptance tests with visit/fill_in/click_button DSL, integrating with RSpec, or testing Rails applications end-to-end. Triggers on "Capybara", "Ruby acceptance test", "fill_in", "click_button", "have_content".

**Playbook Deep Dive (9 sections):**
§1 Project Setup & Configuration · §2 Feature Specs — Interaction Patterns · §3 Page Objects with SitePrism · §4 API Testing with Capybara · §5 Database Cleaning & Test Isolation · §6 Matchers & Custom Helpers · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 9. Geb Skill

**One-liner:** Groovy browser automation with Spock integration, jQuery-like content DSL, and page object pattern for JVM-based testing.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/geb-skill

**When to Apply:**
Reference when writing Groovy browser tests with GebSpec, using jQuery-like $() selectors, or integrating with Spock for BDD-style reporting. Triggers on "Geb", "GebSpec", "Groovy browser test", "Browser.drive".

**Playbook Deep Dive (9 sections):**
§1 Project Setup · §2 Page Objects · §3 Spec Tests (Spock Integration) · §4 Waiting & Async Content · §5 Advanced Patterns · §6 API Testing with Geb · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 10. Selenide Skill

**One-liner:** Concise Java UI testing built on Selenium with automatic waits, fluent $(selector).shouldBe(visible) API, and minimal boilerplate.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/selenide-skill

**When to Apply:**
Reference when wanting Selenium-based testing with less boilerplate, using $() selector syntax with automatic waits, or preferring fluent shouldBe/shouldHave assertions. Triggers on "Selenide", "$() selector", "shouldBe", "shouldHave".

**Playbook Deep Dive (9 sections):**
§1 Project Setup · §2 Fluent API & Selectors · §3 Page Objects · §4 Waiting & Async · §5 Advanced Patterns · §6 LambdaTest Integration · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 11. Nemo.js Skill

**One-liner:** PayPal's Selenium-based Node.js test framework with JSON locator files, profile-based configuration, and plugin architecture.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/nemojs-skill

**When to Apply:**
Reference when working with Nemo.js/PayPal test infrastructure, using JSON-based view locator patterns, or configuring profile-based test environments. Triggers on "Nemo.js", "nemo automation", "PayPal test framework".

**Playbook Deep Dive (8 sections):**
§1 JSON Locator Files (View Pattern) · §2 Profile-Based Configuration · §3 Custom View Methods · §4 Screenshot on Failure · §5 Nemo Plugins · §6 Debugging & Common Issues · §7 CI/CD Integration · §8 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 12. Protractor Skill ⚠️ DEPRECATED

**One-liner:** Angular/AngularJS E2E testing with element(by.model()) selectors — officially deprecated, skill recommends migration to Playwright or Cypress.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/protractor-skill

**When to Apply:**
Reference only when maintaining legacy Protractor tests or planning migration to Playwright/Cypress. The skill includes migration guidance. Triggers on "Protractor", "element(by.model)", "Angular E2E test", "protractor.conf".

**Playbook Deep Dive (9 sections):**
§1 Project Setup (Legacy Maintenance) · §2 Page Objects · §3 Test Specs · §4 Angular-Specific Features · §5 Migration to Playwright · §6 LambdaTest Integration · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 13. Codeception Skill

**One-liner:** Full-stack PHP testing framework covering acceptance (UI), functional, and API test layers with module system and TestMu AI cloud support.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/codeception-skill

**When to Apply:**
Reference when testing PHP applications across multiple layers (acceptance, functional, API), using Codeception modules, or configuring WebDriver-based browser testing in PHP. Triggers on "Codeception", "AcceptanceTester", "Cest", "Codeception PHP".

**Playbook Deep Dive (9 sections):**
§1 Project Setup & Configuration · §2 Acceptance Tests (UI) · §3 API Tests · §4 Page Objects · §5 Database Testing · §6 Custom Helpers & Extensions · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 14. Laravel Dusk Skill

**One-liner:** Chrome-based E2E testing for Laravel apps with $browser->visit DSL, built-in authentication helpers, and component testing.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/laravel-dusk-skill

**When to Apply:**
Reference when testing Laravel applications with Dusk's browser API, using $browser->visit and component assertions, or testing auth flows in Laravel. Triggers on "Laravel Dusk", "Dusk test", "$browser->visit", "DuskTestCase".

**Playbook Deep Dive (10 sections):**
§1 Project Setup · §2 Browser Test Patterns · §3 Page Objects · §4 Components · §5 Advanced Interactions · §6 Database & Test Data · §7 LambdaTest Integration · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 15. Robot Framework Skill

**One-liner:** Keyword-driven testing with SeleniumLibrary and RequestsLibrary using human-readable *** Test Cases *** syntax in Python/Robot.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/robot-framework-skill

**When to Apply:**
Reference when writing keyword-driven tests with Robot Framework syntax, using SeleniumLibrary for browser testing, or creating custom Python keyword libraries. Triggers on "Robot Framework", "*** Test Cases ***", ".robot", "SeleniumLibrary".

**Playbook Deep Dive (10 sections):**
§1 Project Setup & Configuration · §2 Web UI Testing (SeleniumLibrary) · §3 API Testing (RequestsLibrary) · §4 Data-Driven Testing · §5 Custom Python Libraries · §6 Browser Library (Playwright-Based) · §7 LambdaTest Cloud Integration · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.



### 16. Jest Skill

**One-liner:** Jest unit/integration testing with comprehensive mocking (jest.fn, jest.mock, jest.spyOn), React Testing Library integration, snapshot testing, and async patterns in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/jest-skill

**When to Apply:**
Reference when writing JavaScript/TypeScript unit tests, mocking modules or functions, testing React components with Testing Library, or using snapshot testing for UI components. Triggers on "Jest", "expect().toBe()", "jest.mock", "snapshot test", "React test".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Mocking Strategy | CRITICAL | mock- |
| 2 | Assertion Pattern | CRITICAL | assert- |
| 3 | Async Testing | HIGH | async- |
| 4 | React Testing | HIGH | react- |
| 5 | Snapshot Testing | MEDIUM | snapshot- |
| 6 | Table-Driven Tests | MEDIUM | table- |
| 7 | Custom Matchers | LOW-MEDIUM | matcher- |
| 8 | CI/CD & Config | LOW | ci- |

**Quick Reference:**

1. **Mocking Strategy (CRITICAL)**
   - mock-return-value — Use mockReturnValue/mockResolvedValue for deterministic tests
   - mock-module — Use jest.mock('./module') for dependency isolation
   - mock-spy-restore — Always restore spies with spy.mockRestore()
   - mock-fake-timers — Use jest.useFakeTimers() for time-dependent code

2. **Assertion Pattern (CRITICAL)**
   - assert-specific-matcher — Use expect(x).toBe(y) not expect(x === y).toBe(true)
   - assert-await-async — Always await async assertions to prevent swallowed failures
   - assert-to-equal-objects — Use toEqual for deep equality, toBe for primitives

3. **React Testing (HIGH)**
   - react-user-event — Prefer userEvent over fireEvent for realistic interactions
   - react-get-by-role — Use getByRole/getByLabelText for accessible queries
   - react-wait-for — Use waitFor for async state updates

**Playbook Deep Dive (12 sections):**
§1 Production Config · §2 Mocking Deep Dive · §3 Async Patterns · §4 Table-Driven Tests (test.each) · §5 Custom Matchers · §6 React Testing (Testing Library) · §7 Snapshot Testing · §8 Testing API Services · §9 Global Setup/Teardown & Projects · §10 CI/CD Integration · §11 Debugging Table (10 problems) · §12 Best Practices (15 items)


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 17. JUnit 5 Skill

**One-liner:** JUnit 5 testing with parameterized tests, Mockito integration, custom extensions, nested tests, and AssertJ fluent assertions in Java.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/junit-5-skill

**When to Apply:**
Reference when writing Java unit tests with JUnit 5, using @MethodSource/@CsvSource for parameterized tests, integrating Mockito for mocking, or creating custom JUnit extensions. Triggers on "JUnit 5", "JUnit", "@Test", "@MethodSource", "Mockito".

**Playbook Deep Dive (11 sections):**
§1 Project Setup & Configuration · §2 Test Lifecycle & Structure · §3 Parameterized Tests · §4 Mockito Integration · §5 Nested & Dynamic Tests · §6 AssertJ Fluent Assertions · §7 Conditional Execution & Assumptions · §8 Custom Extensions · §9 CI/CD Integration · §10 Debugging Table · §11 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 18. pytest Skill

**One-liner:** pytest testing with fixtures, parametrize decorators, markers, conftest patterns, pytest-mock integration, and async testing in Python.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/pytest-skill

**When to Apply:**
Reference when writing Python tests with pytest, using fixtures for setup/teardown, parameterizing tests with @pytest.mark.parametrize, or configuring conftest.py for shared fixtures. Triggers on "pytest", "conftest", "@pytest.fixture", "@pytest.mark", "Python test".

**Playbook Deep Dive (11 sections):**
§1 Production Configuration · §2 Fixtures (Scoping, Factories, Teardown) · §3 Parameterized Tests · §4 Mocking with pytest-mock · §5 Async Testing · §6 Testing Exceptions & Warnings · §7 Markers & Custom Plugins · §8 Class-Based Test Organization · §9 CI/CD Integration · §10 Debugging Table · §11 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 19. TestNG Skill

**One-liner:** TestNG testing with @DataProvider, groups, parallel execution, XML suite configuration, and listeners for Java-based test automation.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/testng-skill

**When to Apply:**
Reference when writing Java tests with TestNG, configuring testng.xml suites, using @DataProvider for data-driven testing, or setting up parallel execution strategies. Triggers on "TestNG", "@DataProvider", "testng.xml", "groups".

**Playbook Deep Dive (13 sections):**
§1 Project Setup & Configuration · §2 Suite XML Configuration · §3 BaseTest & Thread-Safe Driver · §4 Data Providers (Advanced) · §5 Factory Pattern · §6 Listeners (Production Suite) · §7 Soft Assertions & Dependencies · §8 Page Object Integration · §9 Parallel Execution Strategies · §10 Reporting Integration · §11 CI/CD Integration · §12 Debugging Table · §13 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 20. Vitest Skill

**One-liner:** Vitest testing for Vite projects with Jest-compatible API, native ESM support, HMR, vi.mock/vi.fn patterns, and in-source testing in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/vitest-skill

**When to Apply:**
Reference when testing Vite-based projects, preferring Vitest over Jest for ESM support, using vi.mock for module mocking, or leveraging in-source testing. Triggers on "Vitest", "vi.mock", "vi.fn", "Vite test", "vitest config".

**Playbook Deep Dive (10 sections):**
§1 Production Configuration · §2 Mocking Patterns · §3 React Testing Library Integration · §4 Snapshot & Inline Snapshots · §5 Table-Driven & Parameterized Tests · §6 In-Source Testing · §7 API / Integration Testing · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 21. Mocha Skill

**One-liner:** Mocha testing with Chai assertions, Sinon mocking/stubbing, Supertest for Express API testing, and custom reporters in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/mocha-skill

**When to Apply:**
Reference when writing Node.js tests with Mocha, using Chai for BDD-style assertions, or Sinon for mocks/stubs/spies. Triggers on "Mocha", "Chai", "sinon", "mocha test".

**Playbook Deep Dive (10 sections):**
§1 Production Configuration · §2 Testing with Chai + Sinon · §3 Advanced Sinon Patterns · §4 Async Patterns · §5 Hooks & Test Organization · §6 Custom Reporters & Plugins · §7 Express/API Testing with Supertest · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 22. Jasmine Skill

**One-liner:** Jasmine BDD-style testing with spies (createSpy), async support, custom matchers, and browser testing via Karma in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/jasmine-skill

**When to Apply:**
Reference when writing BDD-style tests with Jasmine, using spies for mocking, or setting up Jasmine with Karma for browser-based testing. Triggers on "Jasmine", "jasmine.createSpy", "toHaveBeenCalled", "jasmine test".

**Playbook Deep Dive (10 sections):**
§1 Project Setup & Configuration · §2 Spies — Complete API · §3 Async Testing Patterns · §4 Custom Matchers · §5 Test Organization — Suites & Context · §6 Mocking Fetch & Modules · §7 Browser Testing with Karma · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 23. Karma Skill

**One-liner:** Karma test runner for browser-based JavaScript testing, optimized for Angular component/service/directive testing with RxJS async patterns.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/karma-skill

**When to Apply:**
Reference when configuring Karma for browser-based test execution, testing Angular components/services, or integrating with LambdaTest cloud for cross-browser unit testing. Triggers on "Karma", "karma.conf", "browser test runner".

**Playbook Deep Dive (10 sections):**
§1 Production Configuration · §2 Angular Component Testing · §3 Service Testing with HTTP · §4 Directive & Pipe Testing · §5 RxJS & Async Patterns · §6 Router & NgRx Testing · §7 LambdaTest Cloud Integration · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 24. xUnit Skill

**One-liner:** xUnit.net testing for C#/.NET with [Fact]/[Theory], constructor injection, IClassFixture, FluentAssertions, and WebApplicationFactory integration.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/xunit-skill

**When to Apply:**
Reference when writing .NET unit tests with xUnit, using [Theory] with InlineData for parameterized tests, or integration testing ASP.NET Core apps with WebApplicationFactory. Triggers on "xUnit", "[Fact]", "[Theory]", "Assert.Equal", "C# xUnit".

**Playbook Deep Dive (10 sections):**
§1 Project Setup & Configuration · §2 Test Patterns — Fact & Theory · §3 Shared Context — IClassFixture & ICollectionFixture · §4 Async Testing & Custom Assertions · §5 Test Data Generation with Bogus · §6 Integration Testing with WebApplicationFactory · §7 Logging & Output · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 25. NUnit Skill

**One-liner:** NUnit 3 testing for C#/.NET with Assert.That constraint model, parameterized [TestCase], Moq mocking, and parallel execution.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/nunit-skill

**When to Apply:**
Reference when writing .NET tests with NUnit's constraint-based assertion model, using [TestCase] attributes for data-driven tests, or integrating Moq for mocking. Triggers on "NUnit", "[TestFixture]", "[Test]", "Assert.That", "C# unit test".

**Playbook Deep Dive (10 sections):**
§1 Project Setup & Configuration · §2 Test Patterns — Test & TestCase · §3 Constraint Model (Assert.That) · §4 OneTimeSetUp, Fixtures & Parallel Execution · §5 Async Testing · §6 Test Data with Bogus · §7 Categories & Filtering · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 26. MSTest Skill

**One-liner:** Microsoft's built-in .NET testing framework with [TestMethod], [DataTestMethod], FluentAssertions, and WebApplicationFactory integration for ASP.NET Core.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/mstest-skill

**When to Apply:**
Reference when using Microsoft's native MSTest for .NET projects, using [DataRow] for parameterized tests, or preferring the built-in Visual Studio test framework. Triggers on "MSTest", "[TestMethod]", "[TestClass]", "Assert.AreEqual".

**Playbook Deep Dive (10 sections):**
§1 Project Setup & Configuration · §2 Test Patterns — TestMethod & DataTestMethod · §3 FluentAssertions Integration · §4 Assembly & Class Initialize · §5 Integration Testing with WebApplicationFactory · §6 Test Data Generation with Bogus · §7 TestContext & Logging · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 27. RSpec Skill

**One-liner:** Ruby testing with describe/context/it blocks, shared examples, FactoryBot data generation, WebMock/VCR for HTTP mocking, and Rails request specs.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/rspec-skill

**When to Apply:**
Reference when writing Ruby/Rails tests with RSpec, using FactoryBot for test data, or mocking HTTP requests with WebMock/VCR. Triggers on "RSpec", "expect().to eq()", "describe do", "Ruby test".

**Playbook Deep Dive (11 sections):**
§1 Project Setup & Configuration · §2 Model & Service Tests · §3 Shared Examples & Contexts · §4 FactoryBot & Test Data · §5 HTTP Mocking with WebMock & VCR · §6 Request & Controller Tests (Rails) · §7 Time-Based Testing · §8 Custom Matchers · §9 CI/CD Integration · §10 Debugging Table · §11 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 28. PHPUnit Skill

**One-liner:** PHPUnit testing for PHP with data providers, createMock/Mockery/Prophecy mocking, Faker fixtures, and Laravel/Symfony HTTP testing patterns.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/phpunit-skill

**When to Apply:**
Reference when writing PHP unit tests, using data providers for parameterized tests, mocking with createMock or Mockery, or testing Laravel/Symfony HTTP controllers. Triggers on "PHPUnit", "TestCase PHP", "assertEquals PHP", "PHP test".

**Playbook Deep Dive (11 sections):**
§1 Project Setup & Configuration · §2 Test Patterns — Assertions & Data Providers · §3 Mocking — createMock, Mockery, Prophecy · §4 Test Doubles — Stubs, Fakes & In-Memory · §5 Faker & Fixtures · §6 Exception & Error Testing · §7 HTTP & API Testing (Symfony/Laravel) · §8 Database Testing · §9 CI/CD Integration · §10 Debugging Table · §11 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 29. Test::Unit Skill

**One-liner:** Classic xUnit-style Ruby testing with assert methods, test case classes, data-driven testing, and custom assertions.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/testunit-skill

**When to Apply:**
Reference when working with Test::Unit in Ruby, preferring classic assert_equal style over RSpec's DSL, or maintaining legacy Ruby test suites. Triggers on "Test::Unit", "assert_equal Ruby", "Ruby test-unit".

**Playbook Deep Dive (9 sections):**
§1 Project Setup · §2 Core Test Patterns · §3 Data-Driven Testing · §4 Mocking & Stubbing · §5 Custom Assertions · §6 Integration Testing · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 30. unittest Skill

**One-liner:** Python's built-in unittest framework with TestCase, setUp/tearDown lifecycle, mock.patch decorators, and subTest for parameterized variants.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/unittest-skill

**When to Apply:**
Reference when using Python's standard library unittest, using unittest.mock.patch for mocking, or when pytest is not available/preferred. Triggers on "unittest", "TestCase", "self.assertEqual", "Python unittest".

**Playbook Deep Dive (9 sections):**
§1 Project Setup · §2 Core Test Patterns · §3 Mocking & Patching · §4 SubTest & Parameterized · §5 Time & Environment Mocking · §6 Custom TestCase & Mixins · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

## 📱 Mobile Testing Skills (5)

---

### 31. Appium Skill

**One-liner:** Cross-platform mobile automation for Android (UiAutomator2) and iOS (XCUITest) with real device cloud testing, W3C gestures, and hybrid app support in Java, Python, JavaScript, Ruby, and C#.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/appium-skill

**When to Apply:**
Reference when automating mobile apps on Android or iOS, testing on real devices or emulators, handling gestures (swipe, long press, pinch), testing hybrid/WebView apps, or running on TestMu AI device farm. Triggers on "Appium", "mobile test", "Android test", "iOS test", "real device", "UiAutomator", "XCUITest driver".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Platform Capabilities | CRITICAL | caps- |
| 2 | Locator Strategy | CRITICAL | locator- |
| 3 | Wait Strategy | HIGH | wait- |
| 4 | Gesture Actions | HIGH | gesture- |
| 5 | Cross-Platform POM | MEDIUM-HIGH | pom- |
| 6 | Cloud Integration | MEDIUM-HIGH | cloud- |
| 7 | Hybrid App Testing | MEDIUM | hybrid- |
| 8 | Device Interactions | LOW-MEDIUM | device- |

**Quick Reference:**

1. **Platform Capabilities (CRITICAL)**
   - caps-android-uiautomator2 — Use automationName: UiAutomator2 for Android
   - caps-ios-xcuitest — Use automationName: XCUITest for iOS
   - caps-separate-sets — Create separate capability sets for Android and iOS

2. **Locator Strategy (CRITICAL)**
   - locator-accessibility-id — Use AccessibilityId first (cross-platform)
   - locator-resource-id — Use Android resource-id for platform-specific
   - locator-ios-predicate — Use iOSNsPredicateString for iOS queries
   - locator-no-xpath — Avoid XPath (slow, fragile on mobile)

3. **Gesture Actions (HIGH)**
   - gesture-w3c-actions — Use W3C Actions API, not deprecated TouchAction
   - gesture-no-hardcoded-coords — Use element-based actions (screen size varies)
   - gesture-swipe-scroll — Use PointerInput sequences for swipe/scroll

**Playbook Deep Dive (11 sections):**
§1 Project Setup & Capabilities · §2 BaseTest with Thread-Safe Driver · §3 Cross-Platform Page Objects · §4 Advanced Gestures (W3C Actions) · §5 WebView & Hybrid App Testing · §6 Device Interactions · §7 Parallel Device Execution · §8 LambdaTest Real Device Cloud · §9 CI/CD Integration · §10 Debugging Table (12 problems) · §11 Best Practices (13 items)


The agent loads from 6 on-demand reference files (`cloud-integration.md`, `hybrid-apps.md`, `ios-specific.md`, `javascript-patterns.md`, `python-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 32. Espresso Skill

**One-liner:** Android-native UI testing that runs inside the app process for maximum speed and reliability, with onView/ViewMatchers/ViewActions pattern in Kotlin/Java.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/espresso-skill

**When to Apply:**
Reference when writing fast, reliable Android UI tests that run inside the app process, using onView with ViewMatchers, testing RecyclerViews, or handling async operations with Idling Resources. Triggers on "Espresso", "onView", "ViewMatchers", "Android UI test", "instrumentation".

**Playbook Deep Dive (10 sections):**
§1 Project Setup · §2 Test Structure & Lifecycle · §3 Custom Matchers & ViewActions · §4 RecyclerView Testing · §5 Idling Resources · §6 Intent Testing · §7 MockWebServer for API Tests · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 3 on-demand reference files (`advanced-patterns.md`, `cloud-integration.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 33. XCUITest Skill

**One-liner:** Apple's native iOS/iPadOS UI testing with XCUIApplication, accessibility identifiers, system alert handling, and performance testing in Swift/Objective-C.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/xcuitest-skill

**When to Apply:**
Reference when writing iOS UI tests with XCUITest, using accessibility identifiers for element queries, handling system alerts/permissions, or testing on TestMu AI real devices. Triggers on "XCUITest", "XCTest UI", "iOS UI test", "Swift UI test", "XCUIApplication".

**Playbook Deep Dive (10 sections):**
§1 Project Setup & Configuration · §2 Page Object Pattern · §3 XCUIElement Extensions · §4 System Alerts & Permissions · §5 Advanced Test Patterns · §6 Network & Performance Testing · §7 LambdaTest Integration · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 34. Flutter Testing Skill

**One-liner:** Flutter widget tests, integration tests, and golden (visual regression) tests with WidgetTester, bloc_test, and HTTP mocking in Dart.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/flutter-testing-skill

**When to Apply:**
Reference when testing Flutter apps at any level (unit, widget, integration), using testWidgets with WidgetTester, creating golden tests for visual regression, or testing Bloc state management. Triggers on "Flutter", "widget test", "Dart test", "testWidgets", "WidgetTester", "golden test".

**Playbook Deep Dive (10 sections):**
§1 Project Setup & Configuration · §2 Unit Tests — Advanced Patterns · §3 Widget Tests — Production Patterns · §4 Golden Tests (Visual Regression) · §5 Integration Tests · §6 Bloc Testing (with bloc_test) · §7 HTTP Mocking & Provider Testing · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 35. Detox Skill

**One-liner:** React Native E2E testing with gray-box synchronization (auto-waits for animations, network, React Native bridge) using element(by.id()) in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/detox-skill

**When to Apply:**
Reference when testing React Native apps end-to-end, leveraging Detox's automatic synchronization with the app, or running on simulators/emulators with gray-box visibility. Triggers on "Detox", "React Native E2E", "React Native test", "element(by.id)", "device.launchApp".

**Playbook Deep Dive (9 sections):**
§1 Project Setup & Configuration · §2 Page Object Pattern · §3 Test Patterns · §4 Advanced Interactions · §5 Matchers & Assertions · §6 Network & Mock Server Integration · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

## 📋 BDD Testing Skills (7)

---

### 36. Cucumber Skill

**One-liner:** Cucumber BDD with Gherkin feature files, step definitions, hooks, tags, Scenario Outline, and dependency injection in Java, JavaScript, Ruby, and TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/cucumber-skill

**When to Apply:**
Reference when writing BDD tests with Given/When/Then syntax, creating Gherkin feature files, implementing step definitions, or setting up Cucumber with dependency injection. Triggers on "Cucumber", "Gherkin", "BDD", "Feature file", "Given/When/Then", "step definitions".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Feature Writing | CRITICAL | feature- |
| 2 | Step Definitions | CRITICAL | step- |
| 3 | Hooks & Lifecycle | HIGH | hook- |
| 4 | Shared State & DI | HIGH | state- |
| 5 | Tags & Filtering | MEDIUM | tag- |
| 6 | Parallel Execution | MEDIUM | parallel- |
| 7 | Reporting | LOW-MEDIUM | report- |

**Quick Reference:**

1. **Feature Writing (CRITICAL)**
   - feature-business-language — Use business language, not UI details in Gherkin
   - feature-declarative-steps — Write declarative steps ("I am logged in") not imperative ("I click login button")
   - feature-background — Use Background for shared setup across scenarios
   - feature-scenario-outline — Use Scenario Outline + Examples for data-driven BDD

2. **Step Definitions (CRITICAL)**
   - step-meaningful-actions — Each step should represent a meaningful business action
   - step-typed-parameters — Use {string}, {int} parameter types for type safety
   - step-no-ui-details — Keep UI interaction details in page objects, not steps

**Playbook Deep Dive (11 sections):**
§1 Project Setup & Configuration · §2 Feature Writing Patterns · §3 Step Definitions · §4 Dependency Injection & Shared State · §5 Hooks (Lifecycle Management) · §6 Custom Parameter Types & Transformers · §7 Parallel Execution · §8 Reporting · §9 CI/CD Integration · §10 Debugging Table (10 problems) · §11 Best Practices (13 items)


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 37. SpecFlow Skill

**One-liner:** .NET BDD with Gherkin feature files, [Binding]/[Given]/[When]/[Then] step bindings, scoped bindings, and dependency injection for C# projects.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/specflow-skill

**When to Apply:**
Reference when writing BDD tests in C#/.NET with SpecFlow, using [Binding] attributes for step definitions, or integrating Gherkin with Visual Studio. Triggers on "SpecFlow", "C# BDD", ".NET BDD", "step bindings", "[Binding]".

**Playbook Deep Dive (9 sections):**
§1 Project Setup · §2 Feature Files · §3 Step Definitions · §4 Page Objects · §5 Hooks & Dependency Injection · §6 Scoped Bindings & Transforms · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 38. Serenity BDD Skill

**One-liner:** Serenity BDD with Screenplay pattern, @Steps annotations, rich HTML reporting, Cucumber integration, and REST API testing in Java.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/serenity-bdd-skill

**When to Apply:**
Reference when implementing the Screenplay pattern for actor-based testing, wanting rich living documentation from tests, or combining BDD with detailed HTML reports. Triggers on "Serenity BDD", "Screenplay pattern", "@Steps", "Serenity report".

**Playbook Deep Dive (10 sections):**
§1 Project Setup · §2 Step Libraries Pattern · §3 Screenplay Pattern · §4 Cucumber Integration · §5 REST API Testing · §6 Reporting & Tags · §7 LambdaTest Integration · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 39. Behave Skill

**One-liner:** Python BDD with Gherkin feature files, step implementations, environment hooks, and page object integration for Python test automation.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/behave-skill

**When to Apply:**
Reference when writing Python BDD tests with Gherkin syntax, implementing step definitions in Python, or configuring environment hooks for lifecycle management. Triggers on "Behave", "Python BDD", "behave test", "Python feature file".

**Playbook Deep Dive (10 sections):**
§1 Project Setup & Configuration · §2 Feature Files — Gherkin Patterns · §3 Step Definitions — Production Patterns · §4 Environment Hooks — Lifecycle · §5 Page Objects · §6 Fixtures & Test Data · §7 LambdaTest Integration · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 40. Behat Skill

**One-liner:** PHP BDD with Gherkin feature files, MinkContext for browser testing, custom formatters, and Drupal/Symfony integration.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/behat-skill

**When to Apply:**
Reference when writing PHP BDD tests with Gherkin, using MinkContext for browser interactions, or testing Drupal/Symfony/Laravel applications with BDD. Triggers on "Behat", "PHP BDD", "Mink", "behat.yml", "FeatureContext PHP".

**Playbook Deep Dive (10 sections):**
§1 Project Setup & Configuration · §2 Feature Files — Gherkin Patterns · §3 Context Classes — Step Definitions · §4 Hooks — Lifecycle Management · §5 Page Objects & Reusable Components · §6 LambdaTest Cloud Integration · §7 Custom Formatters & Reporting · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 41. Gauge Skill

**One-liner:** ThoughtWorks' Markdown-based specification testing with step implementations in Java, Python, JavaScript, Ruby, or C#, and rich data management.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/gauge-skill

**When to Apply:**
Reference when writing specification-based tests in Markdown format, implementing multi-language step definitions, or using Gauge's custom data store for state management. Triggers on "Gauge", "Gauge spec", "Gauge framework", "ThoughtWorks test".

**Playbook Deep Dive (10 sections):**
§1 Project Setup · §2 Spec Files (Markdown Scenarios) · §3 Step Implementations (Java) · §4 Hooks & Execution Control · §5 Page Object Pattern · §6 Data Management & Custom Data Stores · §7 LambdaTest Integration · §8 CI/CD Integration · §9 Debugging Table · §10 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

### 42. Lettuce Skill ⚠️ LEGACY

**One-liner:** Python BDD testing with feature files and step definitions — legacy/unmaintained framework, skill recommends migration to Behave.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/lettuce-skill

**When to Apply:**
Reference only when maintaining existing Lettuce test suites or planning migration to Behave. The skill includes migration guidance as a dedicated playbook section. Triggers on "Lettuce", "lettuce test", "lettuce BDD".

**Playbook Deep Dive (7 sections):**
§1 Data-Driven Scenarios · §2 Terrain Hooks with Error Handling · §3 API Testing Steps · §4 Debugging & Common Issues · §5 CI/CD Integration · §6 Migration to Behave (Recommended) · §7 Best Practices


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

## 👁️ Visual Testing (1)

---

### 43. SmartUI Skill

**One-liner:** Visual regression testing via AI-powered screenshot comparison on TestMu AI cloud — framework-agnostic, works with Playwright, Selenium, Cypress, Puppeteer, and Storybook.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/smartui-skill

**When to Apply:**
Reference when implementing visual regression testing, comparing screenshots across builds, integrating with Storybook for component-level visual testing, or setting up approval workflows for UI changes. Triggers on "SmartUI", "visual regression", "screenshot comparison", "pixel diff", "visual testing LambdaTest".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Snapshot Strategy | CRITICAL | snapshot- |
| 2 | Configuration | HIGH | config- |
| 3 | Integration Pattern | HIGH | integrate- |
| 4 | Approval Workflow | MEDIUM | approval- |
| 5 | CI/CD | LOW-MEDIUM | ci- |

**Quick Reference:**

1. **Snapshot Strategy (CRITICAL)**
   - snapshot-key-pages — Screenshot key pages/components, not everything (noise reduction)
   - snapshot-wait-render — Always configure waitForPageRender for complete screenshots
   - snapshot-multi-viewport — Configure multiple viewports for responsive coverage

2. **Integration Patterns (HIGH)**
   - integrate-playwright-sdk — Use smartuiSnapshot(page, 'Name') for Playwright
   - integrate-selenium-script — Use executeScript("smartui.takeScreenshot=Name") for Selenium
   - integrate-storybook — Use npx smartui storybook <url> for component libraries
   - integrate-cli-exec — Wrap any test with npx smartui exec -- <command>

3. **Approval Workflow (MEDIUM)**
   - approval-baseline — First run creates baseline automatically
   - approval-review-diffs — Review highlighted differences in SmartUI dashboard
   - approval-new-baseline — Approved screenshots become new baseline

**Playbook Deep Dive (9 sections):**
§1 Project Setup · §2 Static URL Testing · §3 Playwright Integration · §4 Component-Level Testing · §5 Advanced Configuration · §6 Selenium Integration · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 1 on-demand reference files (`playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

## ☁️ Cloud Orchestration (1)

---

### 44. HyperExecute Skill

**One-liner:** Blazing-fast test orchestration on TestMu AI cloud via YAML configuration — framework-agnostic, supports AutoSplit, Matrix, and Hybrid execution modes with 10x faster parallel runs.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/hyperexecute-skill

**When to Apply:**
Reference when orchestrating test execution at scale on cloud infrastructure, configuring parallel test distribution across machines, or needing framework-agnostic cloud execution (works with any test framework). Triggers on "HyperExecute", "hyperexecute.yaml", "test orchestration", "fast parallel tests".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Execution Mode | CRITICAL | mode- |
| 2 | Test Discovery | CRITICAL | discovery- |
| 3 | Concurrency | HIGH | concurrency- |
| 4 | Pre/Post Hooks | HIGH | hook- |
| 5 | Retry Strategy | MEDIUM | retry- |
| 6 | CI/CD Integration | MEDIUM | ci- |

**Quick Reference:**

1. **Execution Mode (CRITICAL)**
   - mode-autosplit — Use autosplit: true with dynamic discovery for intelligent parallelism
   - mode-matrix — Use matrix for cross-browser/OS combinations
   - mode-hybrid — Use hybrid for static test suite files

2. **Test Discovery (CRITICAL)**
   - discovery-dynamic — Prefer mode: dynamic for auto-splitting across machines
   - discovery-grep — Use grep to find test files: grep -rn 'test(' tests/ --include='*.spec.ts' -l
   - discovery-framework-specific — Tailor discovery command per framework (Playwright, Cypress, pytest, Maven)

3. **Concurrency (HIGH)**
   - concurrency-high — Set concurrency: 10+ to maximize HyperExecute speed
   - concurrency-retry — Enable retryOnFailure: true with maxRetries: 2 for flaky resilience

**Playbook Deep Dive (8 sections):**
§1 Core Configuration · §2 Matrix Configuration · §3 Advanced Features · §4 CLI Usage & Execution · §5 CI/CD Integration · §6 Multiple Config Files Strategy · §7 Debugging Table · §8 Best Practices


The agent loads from 1 on-demand reference files (`playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

## 🔄 Framework Migration (1)

---

### 45. Test Framework Migration Skill

**One-liner:** Migrate and convert test automation scripts between Selenium, Playwright, Puppeteer, and Cypress with complete API mapping tables across 10 bidirectional migration paths.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/test-framework-migration-skill

**When to Apply:**
Reference when converting tests from one framework to another, porting Selenium tests to Playwright, migrating from Puppeteer to Playwright, or switching from Cypress to another framework. Triggers on "migrate", "convert", "port", "selenium to playwright", "switch from [framework] to [framework]".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Locator Migration | CRITICAL | locator- |
| 2 | Wait Strategy Migration | CRITICAL | wait- |
| 3 | Action Mapping | HIGH | action- |
| 4 | Assertion Conversion | HIGH | assert- |
| 5 | Lifecycle Changes | MEDIUM-HIGH | lifecycle- |
| 6 | Cloud Re-integration | MEDIUM | cloud- |

**Migration Paths Supported (10):**

| Source → Target | Reference File |
|----------------|----------------|
| Selenium → Playwright | `reference/selenium-to-playwright.md` |
| Playwright → Selenium | `reference/playwright-to-selenium.md` |
| Selenium → Puppeteer | `reference/selenium-to-puppeteer.md` |
| Puppeteer → Selenium | `reference/puppeteer-to-selenium.md` |
| Puppeteer → Playwright | `reference/puppeteer-to-playwright.md` |
| Playwright → Puppeteer | `reference/playwright-to-puppeteer.md` |
| Cypress → Playwright | `reference/cypress-to-playwright.md` |
| Playwright → Cypress | `reference/playwright-to-cypress.md` |
| Selenium → Cypress | `reference/selenium-to-cypress.md` |
| Cypress → Selenium | `reference/cypress-to-selenium.md` |

**5-Step Migration Process:**
1. Detect source framework from code patterns
2. Detect target framework from user request
3. Detect language (cross-language migrations may require rewrite)
4. Route to matching reference file for API mapping tables
5. Apply mappings: locators → waits → actions → assertions → lifecycle


The agent loads from 1 on-demand reference files (`overview.md` + 10 bidirectional migration files`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

## 🔧 DevOps / CI/CD (1)

---

### 46. CI/CD Pipeline Skill

**One-liner:** CI/CD pipeline configurations for test automation across GitHub Actions, Jenkins, GitLab CI, and Azure DevOps with TestMu AI cloud integration, caching, and quality gates.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/cicd-pipeline-skill

**When to Apply:**
Reference when setting up automated test execution in CI/CD pipelines, configuring GitHub Actions workflows for test automation, integrating Jenkins/GitLab CI with cloud testing, or implementing quality gates and notifications. Triggers on "CI/CD", "pipeline", "GitHub Actions", "Jenkins", "GitLab CI", "Azure DevOps".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Pipeline Configuration | CRITICAL | pipeline- |
| 2 | Secrets Management | CRITICAL | secrets- |
| 3 | Caching & Speed | HIGH | cache- |
| 4 | Parallel Execution | HIGH | parallel- |
| 5 | Quality Gates | MEDIUM | gate- |
| 6 | Reporting & Notifications | MEDIUM | report- |
| 7 | Docker Services | LOW-MEDIUM | docker- |

**Quick Reference:**

1. **Pipeline Configuration (CRITICAL)**
   - pipeline-github-actions — Use actions/checkout@v4, actions/setup-node@v4, artifact upload
   - pipeline-jenkins — Jenkinsfile with parallel stages (unit + E2E + cloud)
   - pipeline-gitlab — .gitlab-ci.yml with parallel matrix and JUnit reports
   - pipeline-azure — azure-pipelines.yml with variable groups

2. **Secrets Management (CRITICAL)**
   - secrets-github — Store LT_USERNAME/LT_ACCESS_KEY in Settings → Secrets
   - secrets-jenkins — Use credentials store with credentials() binding
   - secrets-gitlab — Store in Settings → CI/CD → Variables

3. **Quality Gates (MEDIUM)**
   - gate-coverage — Enforce minimum code coverage thresholds
   - gate-test-results — Fail pipeline on test failures
   - gate-artifact-upload — Always upload test results as artifacts (if: always())

**Playbook Deep Dive (10 sections):**
§1 GitHub Actions — Production Workflows · §2 Caching & Optimization · §3 GitLab CI — Production Pipeline · §4 Jenkins Pipeline · §5 Quality Gates & Checks · §6 Secrets & Environment Management · §7 Docker Compose for Test Services · §8 Notification & Reporting · §9 Debugging Table · §10 Best Practices


The agent loads from 1 on-demand reference files (`playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

## Shared Infrastructure

### TestMu AI Cloud Reference
**URL:** https://github.com/LambdaTest/agent-skills/tree/main/shared

Universal cloud reference shared across all 46 skills covering authentication, WebSocket/Hub endpoints, desktop browsers (Chrome, Edge, Firefox, Safari, pw-chromium, pw-firefox, pw-webkit), desktop platforms (Windows 11/10, macOS Sequoia through Catalina), Android devices (Pixel 8/7/6/5, Galaxy S24/S23/S22, OnePlus 11/10 Pro + 100 more), iOS devices (iPhone 16/15/14, iPad Pro/Air), LT:Options capability reference, test status reporting in 5 languages, Lambda Tunnel for localhost, geo-location testing (50+ countries), and network/video capture.

### Evaluation Test Cases
**URL:** https://github.com/LambdaTest/agent-skills/tree/main/evals

Each skill has eval JSON files with test cases defining queries, expected behaviors, and categories (basic-generation, cloud-routing, language-detection, pom-structure, mobile, debugging, negative-trigger, scaffold).

### Validation & Scripts
**URL:** https://github.com/LambdaTest/agent-skills/tree/main/scripts

`validate_skills.py` validates all skills against quality standards (YAML frontmatter, line counts, reference files, categories).

---

## How to Use

### Install a Single Skill
```bash
git clone https://github.com/LambdaTest/agent-skills.git
cp -r agent-skills/playwright-skill .claude/skills/
```

### Install All Skills
```bash
# Claude Code
git clone https://github.com/LambdaTest/agent-skills.git .claude/skills/agent-skills

# Cursor
git clone https://github.com/LambdaTest/agent-skills.git .cursor/skills/agent-skills

# Gemini CLI
git clone https://github.com/LambdaTest/agent-skills.git .gemini/skills/agent-skills
```

### Read Individual Skill Files
Each skill directory contains:
- `SKILL.md` — Core instructions with decision trees and quick patterns
- `reference/playbook.md` — Complete implementation guide with all code examples
- `reference/advanced-patterns.md` — Advanced topics and edge cases
- `reference/cloud-integration.md` — TestMu AI cloud-specific patterns (for E2E/mobile skills)

### Validate Skills
```bash
python3 scripts/validate_skills.py
```

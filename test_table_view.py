from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 800})
    page.goto("http://localhost:5173")
    page.wait_for_timeout(2000)

    # Scroll down to end of page to see ResultsView
    page.evaluate("document.querySelector('.flex-1.overflow-y-auto').scrollTo(0, document.querySelector('.flex-1.overflow-y-auto').scrollHeight)")
    page.wait_for_timeout(500)

    # Switch to Table View
    # The button with title "Table View"
    page.click("button[title='Table View']")
    page.wait_for_timeout(500)

    # Take screenshot
    page.screenshot(path="public/table_view.png")

    # Click raw view again
    page.click("button[title='Raw JSON']")
    page.wait_for_timeout(500)

    browser.close()

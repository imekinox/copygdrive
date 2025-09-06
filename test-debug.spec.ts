import { test, expect } from '@playwright/test'

test.describe('Google Drive Copier Debug', () => {
  test('debug file tree and copy functionality', async ({ page }) => {
    // Go to the application
    await page.goto('http://localhost:3000')
    
    // Take initial screenshot
    await page.screenshot({ path: 'debug-1-homepage.png', fullPage: true })
    
    // Check if we're redirected to login
    await page.waitForTimeout(2000)
    const currentUrl = page.url()
    console.log('Current URL:', currentUrl)
    
    if (currentUrl.includes('/login')) {
      console.log('On login page')
      await page.screenshot({ path: 'debug-2-login.png', fullPage: true })
      
      // Look for Google sign-in button
      const googleButton = page.locator('button:has-text("Sign in with Google")')
      if (await googleButton.isVisible()) {
        console.log('Found Google sign-in button')
        // We can't actually sign in during automated tests without credentials
        // but we can verify the UI is working
      }
    }
    
    // Try to navigate directly to dashboard (will redirect if not logged in)
    await page.goto('http://localhost:3000/dashboard')
    await page.waitForTimeout(2000)
    await page.screenshot({ path: 'debug-3-dashboard-attempt.png', fullPage: true })
    
    // Check for any console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text())
      }
    })
    
    // Check for any network failures
    page.on('requestfailed', request => {
      console.log('Request failed:', request.url(), request.failure()?.errorText)
    })
    
    // Try to access a job page directly (will show the UI even if no data)
    await page.goto('http://localhost:3000/jobs/test-job-id')
    await page.waitForTimeout(2000)
    await page.screenshot({ path: 'debug-4-job-page.png', fullPage: true })
    
    // Check if tabs are visible
    const treeTab = page.locator('button:has-text("Tree View")')
    const activityTab = page.locator('button:has-text("Recent Activity")')
    
    if (await treeTab.isVisible()) {
      console.log('Tree View tab is visible')
      await treeTab.click()
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'debug-5-tree-view.png', fullPage: true })
    }
    
    if (await activityTab.isVisible()) {
      console.log('Recent Activity tab is visible')
      await activityTab.click()
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'debug-6-activity-view.png', fullPage: true })
    }
    
    // Check for file tree component
    const fileTree = page.locator('.file-tree-view, [class*="FileTree"]')
    if (await fileTree.isVisible()) {
      console.log('File tree component is visible')
      
      // Try to expand/collapse folders
      const expandButtons = page.locator('button:has(svg[class*="ChevronRight"], svg[class*="ChevronDown"])')
      const expandCount = await expandButtons.count()
      console.log(`Found ${expandCount} expand/collapse buttons`)
      
      if (expandCount > 0) {
        await expandButtons.first().click()
        await page.waitForTimeout(500)
        await page.screenshot({ path: 'debug-7-tree-expanded.png', fullPage: true })
      }
    }
    
    // Check API endpoints
    console.log('\nChecking API endpoints...')
    
    // Test the tree API
    const treeResponse = await page.request.get('http://localhost:3000/api/jobs/test-job-id/tree')
    console.log('Tree API status:', treeResponse.status())
    if (treeResponse.ok()) {
      const treeData = await treeResponse.json()
      console.log('Tree API response:', JSON.stringify(treeData, null, 2))
    }
    
    // Test the progress API  
    const progressResponse = await page.request.get('http://localhost:3000/api/jobs/test-job-id/progress')
    console.log('Progress API status:', progressResponse.status())
    if (progressResponse.ok()) {
      const progressData = await progressResponse.json()
      console.log('Progress API response:', JSON.stringify(progressData, null, 2))
    }
    
    // Check for any React errors in the page
    const reactErrors = await page.locator('.error-boundary, [class*="error"], [class*="Error"]').all()
    if (reactErrors.length > 0) {
      console.log(`Found ${reactErrors.length} potential error elements`)
      for (const error of reactErrors) {
        const text = await error.textContent()
        console.log('Error element text:', text)
      }
    }
    
    // Final screenshot
    await page.screenshot({ path: 'debug-8-final.png', fullPage: true })
    
    console.log('\nDebug test completed. Check the screenshot files for visual debugging.')
  })
})
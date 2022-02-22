const {Builder, Capabilities, By} = require('selenium-webdriver');

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test(`cross off movie`, async () => {
    let movieName = `Movie`
    let textBox = await driver.findElement(By.xpath(`//form/input`))

    await textBox.sendKeys(movieName)
    await driver.findElement(By.xpath(`//form/button`)).click()
    
    await driver.findElement(By.xpath(`//li/span[text()="${movieName}"]`)).click()

    textBox.clear()

    await driver.sleep(1000)
})

test(`delete movie`, async () => {
    let movieName = `HappyFeet`
    let textBox = await driver.findElement(By.xpath(`//form/input`))

    await textBox.sendKeys(movieName)
    await driver.findElement(By.xpath(`//form/button`)).click()
    
    await driver.findElement(By.id(`${movieName}`)).click()

    textBox.clear()

    await driver.sleep(1000)
})

test(`message test`, async () => {
    let movieName = `LastDance`
    let textBox = await driver.findElement(By.xpath(`//form/input`))

    await textBox.sendKeys(movieName)
    await driver.findElement(By.xpath(`//form/button`)).click()
    
    await driver.findElement(By.id(`${movieName}`)).click()

    let message = await driver.findElement(By.id(`message`)).getText()

    textBox.clear()

    await driver.sleep(1000)

    expect(message).toBe(`${movieName} deleted!`)
})
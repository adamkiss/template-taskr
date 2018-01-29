import test from 'ava'
import sao from 'sao'

const template = {
	fromPath: __dirname
}

test('Everything works', async t => {
	const stream = await sao.mockPrompt(template, {})
	t.snapshot(stream.fileList, 'Generated files')
	const pkg = JSON.parse(stream.fileContents('package.json'))
	t.is(pkg.license, 'MIT')
})

test('Correctly sets testing tools', async t => {
	for (let tool of ['tape', 'ava', 'jasmine', 'mocha']){
		const stream = await sao.mockPrompt(template, { testTool: tool })
		return t.true(stream.fileList.indexOf(`test/test-${tool}.js`) !== -1, `correctly set tool to${tool}`)
	}
})

test('Correctly setup Names', async t => {
	const stream = await sao.mockPrompt(template, { name: 'Plugin X' })
	t.snapshot(stream.fileList, 'Generated files')
	const pkg = JSON.parse(stream.fileContents('package.json'))
	t.is(pkg.name, 'taskr-plugin-x')
})
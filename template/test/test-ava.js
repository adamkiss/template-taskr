const join = require('path').join
const Taskr = require('taskr')
const test = require('ava')

const dir = join(__dirname, 'fixtures')
const plugins = [require('@taskr/clear'), require('../')]

const tmpDir = str => join(__dirname, str)
const create = tasks => new Taskr({tasks, plugins})

test('attach `<%= prefixedName %>` plugin to instance', t => {
	const taskr = create()
	t.ok('<%= slugName %>' in taskr.plugins)
})

test('attach `<%= prefixedName %>` to Task instance', t => {
	create({
		* foo(task) {
			t.ok('<%= slugName %>' in task)
		}
	}).start('foo')
})

test('example usage test', t => {
	create({
		* foo(task) {
			const tmp = tmpDir('tmp1')
			yield task.source(`${dir}/*.js`).target(tmp)
			const arr = yield task.$.expand(`${tmp}/*.js`)
			t.equal(arr.length, 1, 'copied one file to target tar')
			yield task.clear(tmp) // Cleanup
		}
	}).start('foo')
})

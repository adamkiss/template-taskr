const join = require('path').join
const Taskr = require('taskr')
const test = require('tape')

const dir = join(__dirname, 'fixtures')
const plugins = [require('@taskr/clear'), require('../')]

const tmpDir = str => join(__dirname, str)
const create = tasks => new Taskr({tasks, plugins})

test('<%= prefixedName %>', t => {
	t.plan(3)
	const taskr = create({
		* foo(task) {
			t.true('<%= slugName %>' in task, 'attach `<%= prefixedName %>` to Task instance')
			t.true('<%= slugName %>' in taskr.plugins, 'attach `<%= prefixedName %>` plugin to instance')
			// Example usage test
			const tmp = tmpDir('tmp1')
			yield task.source(`${dir}/*.js`).target(tmp)
			const arr = yield task.$.expand(`${tmp}/*.js`)
			t.equal(arr.length, 1, 'copied one file to target tar')
			yield task.clear(tmp) // Cleanup
		}
	})
	taskr.start('foo')
})

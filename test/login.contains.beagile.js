import { mount } from '@vue/test-utils'
import login from '@/pages/firstpage/login.vue'

describe('BeAgile', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(login)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<p>Be agile</p>')
  })

})

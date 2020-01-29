import { mount } from '@vue/test-utils'
import CommonHeader from '@/components/organisms/CommonHeader.vue'

describe('CommonHeader', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CommonHeader)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

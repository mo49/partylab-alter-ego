import { mount } from '@vue/test-utils'
import Counter from '@/components/molecules/Counter.vue'

describe('Counter', () => {
  const wrapper = mount(Counter)
  test('setup correctly', () => {
    expect(true).toBe(true)
  })
  test('increment number', () => {
    expect(wrapper.text()).toContain('Counter: 0')
    wrapper.find('button.increment-button').trigger('click')
    expect(wrapper.text()).toContain('Counter: 1')
  })
})

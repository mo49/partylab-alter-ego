import VueTestUtils from '@vue/test-utils';
VueTestUtils.config.stubs['nuxt-link'] = VueTestUtils.RouterLinkStub;
VueTestUtils.config.stubs['no-ssr'] = '<span><slot /></span>';

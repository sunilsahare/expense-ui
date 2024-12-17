import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import InputWithError from '../../src/components/InputWithError.vue';

describe('InputWithError.vue', () => {

    it('rendering input if "type" is "text"', async () => {
        const wrapper = mount(InputWithError, {
            props: {
                type: 'text',
                label: 'Title',
                inputId: 'title',
                placeholder: 'Enter Title',
                task: 'title',
                'onUpdate:task': (e) => wrapper.setProps({ task: e }),
                error: 'Some error',
                'onUpdate:error': (e) => wrapper.setProps({ error: e }),
            },
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('type')).toBe('text');
        expect(input.attributes('placeholder')).toBe('Enter Title');
        expect(input.element.value).toBe('title');

        const errorMsg = wrapper.find('small');
        expect(errorMsg.exists()).toBe(true);
        expect(errorMsg.text()).toBe('Some error');
    });

    it('rendering input if "type" is "number"', async () => {
        const wrapper = mount(InputWithError, {
            props: {
                type: 'number',
                label: 'Amount',
                inputId: 'amount',
                placeholder: 'Enter Amount',
                task: 2500,
                'onUpdate:task': (e) => wrapper.setProps({ task: e }),
                error: 'Amount is required',
                'onUpdate:error': (e) => wrapper.setProps({ error: e }),
            },
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('type')).toBe('number');
        expect(input.attributes('placeholder')).toBe('Enter Amount');
        expect(input.attributes('aria-invalid')).toBe("true");
        expect(input.element.value).toBe('2500');

        const errorMsg = wrapper.find('small');
        expect(errorMsg.exists()).toBe(true);
        expect(errorMsg.text()).toBe('Amount is required');
    });

    it('renders an input if "type" is "date"', async () => {
        const wrapper = mount(InputWithError, {
            props: {
                type: 'date',
                label: 'Date',
                inputId: 'Date',
                placeholder: 'Enter date',
                task: '2024-12-12',
                'onUpdate:task': (e) => wrapper.setProps({ task: e }),
                error: 'Invalid date',
                'onUpdate:error': (e) => wrapper.setProps({ error: e }),
            },
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('type')).toBe('date');
        expect(input.attributes('placeholder')).toBe('Enter date');
        expect(input.attributes('aria-invalid')).toBe("true");
        expect(input.element.value).toBe('2024-12-12');

        const errorMsg = wrapper.find('small');
        expect(errorMsg.exists()).toBe(true);
        expect(errorMsg.text()).toBe('Invalid date');
    });


});

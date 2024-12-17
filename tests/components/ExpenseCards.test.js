import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Table from '../../src/components/Table.vue';

describe('Table.vue', () => {
    let expenses;

    beforeEach(() => {
        expenses = [
            {
                title : "Traveled to Goa",
                category : "Travel",
                amount : "9770",
                date : "2024-02-10"
            },
            {
                title : "Watch Movie",
                category : "Entertainment",
                amount : "1200",
                date : "2023-12-10"
            },
        ];
    });

    it('correctly render employee information on Ui ', async () => {
        const wrapper = mount(Table, {
            props: { expenses },
        });

        expect(wrapper.text()).toContain('Travel');
        expect(wrapper.text()).toContain('Entertainment');

        expect(wrapper.text()).toContain('1200');
        expect(wrapper.text()).toContain('9770');
        expect(wrapper.text()).toContain('Watch Movie');
        expect(wrapper.text()).toContain('Traveled to Goa');
    });


    it('expense should not be rendered if there are no expenses', async () => {
        const wrapper = mount(Table, {
            props: { employees: [] },
        });

        expect(wrapper.text()).not.toContain('Watch Movie');
        expect(wrapper.text()).not.toContain('1200');
    });
});

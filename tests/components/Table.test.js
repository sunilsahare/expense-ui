import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Table from "../../src/components/Table.vue";

describe("Table.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    const expenses = [
        {
            title: "Traveled to Goa",
            category: "Travel",
            amount: "9770",
            date: "2024-02-10"
        },
        {
            title: "Watch Movie",
            category: "Entertainment",
            amount: "1200",
            date: "2023-12-10"
        },
    ];

    it("renders table headers correctly", () => {
        const wrapper = mount(Table, {
            props: { expenses },
        });

        const headers = wrapper.findAll("th");
        expect(headers[0].text()).toBe("Id");
        expect(headers[1].text()).toBe("Title");
        expect(headers[2].text()).toBe("Amount");
        expect(headers[3].text()).toBe("Category");
        expect(headers[4].text()).toBe("Date");
    });

    it("renders expense rows correctly", () => {
        const wrapper = mount(Table, {
            props: { expenses },
        });

        const rows = wrapper.findAll("tbody tr");
        expect(rows).toHaveLength(expenses.length);

        const firstRow = rows[0];
        expect(firstRow.text()).toContain(expenses[0].title);
        expect(firstRow.text()).toContain(expenses[0].amount);
        expect(firstRow.text()).toContain(expenses[0].category);
        expect(firstRow.text()).toContain(expenses[0].date);

        const secondRow = rows[1];
        expect(secondRow.text()).toContain(expenses[1].title);
        expect(secondRow.text()).toContain(expenses[1].amount);
        expect(secondRow.text()).toContain(expenses[1].category);
        expect(secondRow.text()).toContain(expenses[1].date);
    });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import LoginView from "../../src/view/LoginView.vue";

describe("LoginView.vue", () => {

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("renders LoginView form", () => {
        const wrapper = mount(LoginView);

        expect(wrapper.find("form").exists()).toBe(true);
        expect(wrapper.find("input#floatingInput").exists()).toBe(true);
        expect(wrapper.find("input#floatingPassword").exists()).toBe(true);
        expect(wrapper.find("button[type='submit']").text()).toBe("Sign in");
    });

    it("checks if remember me checkbox is there", () => {
        const wrapper = mount(LoginView);
        const rememberMeCheckbox = wrapper.find("input[type='checkbox']");
        expect(rememberMeCheckbox.exists()).toBe(true);
        expect(rememberMeCheckbox.attributes("id")).toBe("flexCheckDefault");
    });
});

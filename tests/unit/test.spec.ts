import { reactive, ref, computed } from 'vue';

function f(r: any): any {
    const a = ref(r.a);

    let multiply = computed(() => {
        return a.value * 2;
    })

    return {
        multiply
    }
}

test("test reactivity", () => { 
    const a = ref(2);
    const t = {
        a
    };
    const func = f(t);
    t.a.value = 4;
    console.log(func.multiply.value);
})
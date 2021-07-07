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
    const t = reactive({
        a: 2
    });
    const func = f(t);
    t.a = 4;
    console.log(func.multiply.value);
})
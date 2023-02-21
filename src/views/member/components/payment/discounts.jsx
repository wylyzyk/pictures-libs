import { defineComponent, ref } from "vue";

const Discounts = defineComponent(() => {
  // 倒计时是否结束
  const isCountDownFinish = ref(false);

  return () =>
    !isCountDownFinish.value && (
      <div className="flex justify-center items-center py-0.5 bg-orange-900 border-orange-600 border-t xl:border xl:rounded-sm">
        <SvgIcon name="countdown" class="w-1.5 h-1.5 mr-1" fillClass="fill-red-600"></SvgIcon>
        <p class="text-xs text-red-600 font-bold">
          限时特惠 | 距离优惠结束仅剩
          <CountDown
            time={52 * 60 * 1000}
            class="inline-block"
            onFinish={() => {
              isCountDownFinish.value = true;
            }}
          ></CountDown>
        </p>
      </div>
    );
});

export default Discounts;

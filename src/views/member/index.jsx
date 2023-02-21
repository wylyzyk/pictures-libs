import { defineComponent, ref } from "vue";
import { getVipPayList } from "@/api/pay";
import { isMobileTerminal } from "@/utils/flexible";
import PayMenuItem from "./components/payMenuItem";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import PayMent from "./components/payment";

const Member = defineComponent(() => {
  const vipPayListData = ref([]);
  const currentPayData = ref({});

  /**
   * 获取支付数据
   */
  const getVipPayListData = async () => {
    const res = await getVipPayList();
    vipPayListData.value = res;
    currentPayData.value = vipPayListData.value[0];
  };
  getVipPayListData();

  const onChangeCurrentPay = (item) => {
    currentPayData.value = item;
  };

  // navbar
  const router = useRouter();
  const store = useStore();
  const onNavbarLeftClick = () => {
    // 配置跳转方式
    store.commit("app/changeRouterType", "back");
    router.back();
  };

  return () => (
    <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
      <div class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4">
        {/* <!-- 移动端 navbar 处理 --> */}
        {isMobileTerminal.value && (
          <Navbar clickLeft={onNavbarLeftClick} sticky={true}>
            精选会员
          </Navbar>
        )}

        <div class="py-2 px-1">
          <h2 class="text-center text-[34px] font-bold tracking-widest text-yellow-600">精选VIP</h2>
          <p class="text-center text-lg text-yellow-500">升级精选VIP, 畅想所有内容</p>
          <div class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {vipPayListData.value.map((item) => (
              <PayMenuItem
                key={item.id}
                hot={item.isHot}
                select={item.id === currentPayData.value.id}
                data={item}
                onClick={() => onChangeCurrentPay(item)}
              ></PayMenuItem>
            ))}
          </div>
          <p class="mt-1 text-sm text-zinc-500">{currentPayData.value.desc}</p>
          {/* <!-- 支付 --> */}
          <PayMent class="mt-4" />
          {/* <payment-vue class="mt-4" payData={currentPayData} /> */}
        </div>
      </div>
    </div>
  );
});

export default Member;

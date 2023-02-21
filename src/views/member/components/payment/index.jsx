import { isMobileTerminal } from "@/utils/flexible";
import { defineComponent } from "vue";
import MobilePayment from "./mobile-payment";
import PcPayMent from "./pc-payment";

const PayMent = defineComponent(() => {
  return () => (
    <div>
      {!isMobileTerminal.value ? <PcPayMent /> : <MobilePayment />}
      {/* pc */}

      {/* mobie */}
    </div>
  );
});

export default PayMent;

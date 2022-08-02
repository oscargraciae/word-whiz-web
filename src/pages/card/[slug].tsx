import { useRouter } from "next/router";
import { ReactElement } from "react"
import { CardProfile } from "../../components/admin/card/CardProfile";
import { CardSettings } from "../../components/admin/card/CardSettings";
import { LayoutDashboard } from "../../components/general/LayoutDashboard"
import { CardProvder } from "../../context/CardContext";
import { trpc } from "../../utils/trpc";

export default function ProfileIndex() {

  return (
    <LayoutDashboard>
      <CardProvder>
        <div className="grid grid-cols-3">
          <div className="px-6">
            <CardSettings />
          </div>

          <div className="flex items-center justify-center col-span-2">
            <CardProfile />
          </div>
        </div>
      </CardProvder>
    </LayoutDashboard>
  )
}


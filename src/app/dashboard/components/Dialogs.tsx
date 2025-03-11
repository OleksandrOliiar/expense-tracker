"use client";

import { useDialogs } from "../store/dialogs";
import SubscribeDialog from "./SubscribeDialog";
import ChangePlanDialog from "./ChangePlanDialog";

const Dialogs = () => {
  const {
    subscribeDialogOpen,
    changePlanDialogOpen,
    setSubscribeDialogOpen,
    setChangePlanDialogOpen,
  } = useDialogs();

  const handleSubscribeDialogClose = () => {
    setSubscribeDialogOpen(false);
  };

  const handleChangePlanDialogClose = () => {
    setChangePlanDialogOpen(false);
  };

  return (
    <>
      <SubscribeDialog
        open={subscribeDialogOpen}
        onClose={handleSubscribeDialogClose}
      />
      <ChangePlanDialog
        open={changePlanDialogOpen}
        onClose={handleChangePlanDialogClose}
      />
    </>
  );
};

export default Dialogs;

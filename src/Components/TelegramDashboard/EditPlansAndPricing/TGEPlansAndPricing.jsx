import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
import { useState } from 'react';
import TGEPlanAndPriceEditCreate from './TGEPlanAndPriceEditCreate';
import TGESinglePlan from './TGESinglePlan';

const TGEPlansAndPricing = ({
  openPlanSideBar = false,
  setOpenPlanSideBar = () => {},
  plans = [],
  onSavePlan,
  onDeletePlan,
  onDragPlans,
  onTogglePlanStatus,
  isSavingPlan,
  isDeletingPlan,
}) => {
  const [planObj, setPlanObj] = useState({});
  const onEditPlan = planId => {
    let planToEdit = plans.find(
      plan => planId && plan._id === planId
    );
    if (!planToEdit) return;
    setPlanObj({ ...planToEdit });
    setOpenPlanSideBar(true);
  };

  return (
    <div className="pd-plans">
      <DragDropContext onDragEnd={onDragPlans}>
        <div className="pd-plans-body">
          <Droppable droppableId="droppable-id">
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {plans?.length ? (
                  <div className="pd-plans-list">
                    {plans.map((obj, index) =>
                      plans.length > 1 ? (
                        <Draggable
                          key={obj._id}
                          draggableId={obj._id}
                          index={index}
                        >
                          {provided => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TGESinglePlan
                                planObj={obj}
                                numOfPlans={plans?.length}
                                onEdit={onEditPlan}
                                onToggleStatus={
                                  onTogglePlanStatus
                                }
                                index={index}
                                plansLength={plans.length}
                              />
                            </div>
                          )}
                        </Draggable>
                      ) : (
                        <TGESinglePlan
                          key={obj._id}
                          planObj={obj}
                          numOfPlans={plans?.length}
                          onEdit={onEditPlan}
                          onToggleStatus={
                            onTogglePlanStatus
                          }
                          index={index}
                          plansLength={plans.length}
                        />
                      )
                    )}
                    {provided.placeholder}
                  </div>
                ) : null}
              </div>
            )}
          </Droppable>
          <div
            className="pd-plans__add-cta"
            onClick={() => {
              setPlanObj({});
              setOpenPlanSideBar(true);
            }}
          >
            + Add another Plan
          </div>
        </div>
      </DragDropContext>
      <TGEPlanAndPriceEditCreate
        openSideBar={openPlanSideBar}
        setOpenSideBar={setOpenPlanSideBar}
        plan={planObj}
        numOfPlans={plans?.length}
        onSave={onSavePlan}
        onDelete={onDeletePlan}
        isSaving={isSavingPlan}
        isDeleting={isDeletingPlan}
      />
    </div>
  );
};

export default TGEPlansAndPricing;

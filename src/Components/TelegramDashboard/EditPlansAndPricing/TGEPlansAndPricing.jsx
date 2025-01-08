import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
import React, { useState } from 'react';
import TGEPlanAndPriceEditCreate from './TGEPlanAndPriceEditCreate';
import TGESinglePlan from './TGESinglePlan';
import { Button } from '@mantine/core';

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
    <>
      <DragDropContext onDragEnd={onDragPlans}>
        <Droppable droppableId="droppable-id">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {plans?.length ? (
                <div className="flex flex-col">
                  {plans.map((obj, index) => {
                    plans.length > 1 ? (
                      <Draggable
                        key={obj._id}
                        draggableId={obj._id}
                        index={index}
                      >
                        {provided => (
                          <div
                            className="mb-3"
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
                      <div className="mb-3" key={obj._id}>
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
                    );
                  })}
                  {provided.placeholder}
                </div>
              ) : null}
            </div>
          )}
        </Droppable>
        <Button
          variant="outline"
          fullWidth
          size="md"
          onClick={() => {
            setPlanObj({});
            setOpenPlanSideBar(true);
          }}
        >
          + Add another Plan
        </Button>
        {/* <div
            className="tgd-plans__add-cta"
            onClick={() => {
              setPlanObj({});
              setOpenPlanSideBar(true);
            }}
          ></div> */}
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
    </>
  );
};

export default React.memo(TGEPlansAndPricing);

import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
import React from 'react';

const DragAndDrop = ({
  onDrag = () => {},
  array = [],
  children,
}) => {
  return (
    <DragDropContext onDragEnd={onDrag}>
      <Droppable droppableId="droppable-id">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {array?.length ? (
              <div className="flex flex-col">
                {array.map((item, index) =>
                  array.length > 1 ? (
                    <Draggable
                      key={
                        item.id ||
                        item._id ||
                        item.type ||
                        index
                      }
                      draggableId={
                        item.id ||
                        item._id ||
                        item.type ||
                        index
                      }
                      index={index}
                    >
                      {provided => (
                        <div
                          className="mb-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {children({
                            provided,
                            index,
                            arrayLength: array.length,
                            item,
                            showDrag: array.length > 1,
                          })}
                        </div>
                      )}
                    </Draggable>
                  ) : (
                    children({
                      index,
                      arrayLength: array.length,
                      item,
                      showDrag: array.length > 1,
                    })
                  )
                )}
                {provided.placeholder}
              </div>
            ) : null}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default React.memo(DragAndDrop);

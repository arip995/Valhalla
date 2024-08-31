import { Modal } from '@mantine/core';

// import AddEditLesson from './AddEditLesson';

const CreateCourseAddEditLessonModal = ({
  show,
  setShow,
  // dataToEdit,
  // canDelete,
  // onDelete,
  // onUpdate,
}) => {
  return (
    <>
      <Modal
        opened={show}
        title="Lesson"
        onClise={() => setShow(false)}
        className={'ael-modal-container'}
      >
        {show ? (
          <div className=""></div>
        ) : //   <AddEditLesson
        //     dataToEdit={dataToEdit}
        //     canDelete={canDelete}
        //     onDelete={onDelete}
        //     onUpdate={onUpdate}
        //   />
        null}
      </Modal>
    </>
  );
};

export default CreateCourseAddEditLessonModal;

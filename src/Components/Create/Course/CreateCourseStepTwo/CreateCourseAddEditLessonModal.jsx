import { Modal } from '@mantine/core';
import CreateCourseAddEditLesson from './CreateCourseAddEditLesson';

// import AddEditLesson from './AddEditLesson';

const CreateCourseAddEditLessonModal = ({
  show,
  setShow,
  dataToEdit,
  canDelete,
  onDelete,
  onUpdate,
}) => {
  return (
    <>
      <Modal
        opened={show}
        title="Lesson"
        onClose={() => setShow(false)}
        className={'ael-modal-container'}
      >
        {show ? (
          <CreateCourseAddEditLesson
            dataToEdit={dataToEdit}
            canDelete={canDelete}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default CreateCourseAddEditLessonModal;

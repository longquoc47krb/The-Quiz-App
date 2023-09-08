import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';

const tinymceConfig = {
  height: 300,
  menubar: false,
  plugins: [
    'advlist autolink lists link image',
    'charmap print preview anchor help',
    'searchreplace visualblocks code',
    'insertdatetime media table paste wordcount',
  ],
  toolbar:
    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
};

export default tinymceConfig;

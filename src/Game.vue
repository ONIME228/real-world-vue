<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      default: "submit",
    },
    icon: {
      type: Object,
      validator(value) {
        return value["right"] || value["left"] ? true : false;
      },
      isSpinner: {
        type: Boolean,
        default: true,
      },
      isReplace: {
        type: Boolean,
        default: true,
      },
    },
  },
};
</script>
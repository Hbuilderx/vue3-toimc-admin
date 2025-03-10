<template> <VueEditor :editor="editor" /> </template>

<script lang="ts">
  import { Editor, rootCtx, defaultValueCtx, createCmdKey } from '@milkdown/core'
  import { nord } from '@milkdown/theme-nord'
  import { VueEditor, useEditor } from '@milkdown/vue'
  import { commonmark } from '@milkdown/preset-commonmark'
  import { clipboard } from '@milkdown/plugin-clipboard'
  import { cursor } from '@milkdown/plugin-cursor'
  import { diagram } from '@milkdown/plugin-diagram'
  import { emoji } from '@milkdown/plugin-emoji'
  import { history } from '@milkdown/plugin-history'
  import { indent } from '@milkdown/plugin-indent'
  import { listener, listenerCtx } from '@milkdown/plugin-listener'
  import { math } from '@milkdown/plugin-math'
  import { menu } from '@milkdown/plugin-menu'
  import { prism } from '@milkdown/plugin-prism'
  import { slash } from '@milkdown/plugin-slash'
  import { tooltip } from '@milkdown/plugin-tooltip'
  import { upload } from '@milkdown/plugin-upload'
  import { useMilkDownConfig } from './config'

  import 'katex/dist/katex.min.css'

  export const SelectParent = createCmdKey('SelectParent')

  type MenuType = 'diagram' | 'tooltip' | 'math' | 'upload' | 'slash' | 'menu'

  export default defineComponent({
    components: { VueEditor },
    props: {
      defaultValue: {
        type: String,
        default: ''
      },
      menu: {
        type: Array as PropType<MenuType[]>,
        default: () => ['diagram', 'tooltip', 'math', 'upload', 'slash', 'menu']
      }
    },
    emits: ['beforeMount', 'mounted', 'updated', 'markdownUpdated', 'blur', 'focus', 'destory'],
    setup(props, { emit }) {
      const { defaultValue } = toRefs(props)

      const { config } = useMilkDownConfig()

      const enableKey = (type: MenuType): boolean => props.menu.includes(type)

      const editor = useEditor((root) => {
        const instance = Editor.make()
          .config((ctx) => {
            ctx.set(rootCtx, root)
            ctx.set(defaultValueCtx, defaultValue.value)
            ctx
              .get(listenerCtx)
              .beforeMount((ctx) => {
                // before the editor mounts
                emit('beforeMount', ctx)
              })
              .mounted((ctx) => {
                // after the editor mounts
                emit('mounted', ctx)
              })
              .updated((ctx, doc, prevDoc) => {
                // when editor state updates
                emit('updated', { ctx, doc, prevDoc })
              })
              .markdownUpdated((ctx, markdown, prevMarkdown) => {
                // when markdown updates
                emit('markdownUpdated', { ctx, markdown, prevMarkdown })
              })
              .blur((ctx) => {
                // when editor loses focus
                emit('blur', ctx)
              })
              .focus((ctx) => {
                // when focus editor
                emit('focus', ctx)
              })
              .destroy((ctx) => {
                // when editor is being destroyed
                emit('destory', ctx)
              })
          })
          .use(nord)
          .use(commonmark)
          .use(clipboard)
          .use(cursor)
          .use(history)
          .use(listener)
          .use(emoji)
          .use(prism)
          .use(indent)

        enableKey('diagram') && instance.use(diagram())
        enableKey('tooltip') && instance.use(tooltip)
        enableKey('math') && instance.use(math)
        enableKey('upload') && instance.use(upload)
        enableKey('slash') && instance.use(slash)
        enableKey('menu') &&
          instance.use(
            menu({
              config
            })
          )
        return instance
      })

      return {
        editor
      }
    }
  })
</script>

<style lang="scss">
  /* fallback */
  @font-face {
    font-family: "Material Icons Outlined";
    font-style: normal;
    font-weight: 400;
    src: url("./material-icons-outlined.woff2") format("woff2");
  }

  .material-icons-outlined {
    display: inline-block;
    font-family: "Material Icons Outlined";
    font-size: 24px;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    font-feature-settings: "liga";
  }
</style>

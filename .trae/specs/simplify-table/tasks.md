# Tasks

- [x] Task 1: Remove merge/split cell state and logic
  - Remove `canMergeCells` and `canSplitCell` state
  - Remove onUpdate/onSelectionUpdate logic for these states
  - Remove merge/split button from toolbar
- [x] Task 2: Update icons import
  - Remove ScissorIcon and JoinRoundIcon imports
  - Add Add01Icon and Remove01Icon
- [x] Task 3: Clean up table CSS
  - Remove selectedCell styles
  - Remove merged cell styles
  - Keep only basic table formatting
- [x] Task 4: Add basic row/column operations
  - Add add/remove row buttons
  - Add add/remove column buttons
  - Use Tiptap's built-in table commands
- [x] Task 5: Build and verify
  - Run npm run build ✓
  - Run npm run lint (pre-existing errors not related to our changes)

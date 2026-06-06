# Simplify Table Functionality

## Why
Current table functionality has significant issues and logic problems:
- Complex merge/split cells feature causes visual and structural anomalies
- Overly complex codebase leads to bugs and instability
- User feedback requires a clean slate approach

## What Changes
- **REMOVE**: Complex cell merge/split functionality
- **REMOVE**: Custom cell selection logic
- **SIMPLIFY**: Keep only basic table operations (insert, add/remove rows/columns)
- **SIMPLIFY**: Clean up table CSS and state management
- **KEEP**: Table grid picker for inserting tables
- **KEEP**: Basic row/column manipulation

## Impact
- Affected specs: Rich text editor table functionality
- Affected code: `src/components/RichTextEditor.tsx`, `src/index.css`

## ADDED Requirements
### Requirement: Simplified Table Operations
The system shall provide only basic, stable table operations:
- Insert table via grid picker
- Add/remove rows
- Add/remove columns

#### Scenario: Insert Table
- **WHEN** User clicks table button and selects dimensions
- **THEN** Table is inserted with basic formatting

#### Scenario: Basic Row Operations
- **WHEN** User interacts with table
- **THEN** Can add/remove rows via toolbar

#### Scenario: Basic Column Operations
- **WHEN** User interacts with table
- **THEN** Can add/remove columns via toolbar

## REMOVED Requirements
### Requirement: Merge/Split Cells
**Reason**: Complex and buggy, causes user frustration
**Migration**: Users can use basic tables without cell merging

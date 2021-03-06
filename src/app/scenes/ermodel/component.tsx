import React, { Fragment, PureComponent, SFC } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper/Paper';
import { ERModel } from 'gdmn-orm';
import CSSModules from 'react-css-modules';
import { pure, withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ITableColumn, ITableRow, withSelectorSelection } from './components/data-grid-core';
import {
  InfiniteTableLayout,
  TableCell,
  TableRow,
  TableSelectorCell,
  TTableRowProps
} from './components/data-grid-mui';
import { actions } from './actions';
import { entitiesSelectedRowSelector, fieldsSelectedRowSelector } from './selectors';

// const commonStyle = require('@src/styles/common.css');
const styles = require('./styles.css');

interface IERModelBoxStateProps {
  readonly erModel: ERModel;
  readonly err?: string | null;
  readonly entitiesTableColumns: ITableColumn[];
  readonly entitiesTableHeadRows?: ITableRow[];
  // readonly entitiesTableFootRows?: ITableRow[];
  readonly fieldsTableColumns?: ITableColumn[];
  readonly fieldsTableHeadRows?: ITableRow[];
  // readonly fieldsTableFootRows?: ITableRow[];
}

interface IERModelBoxSelectorProps {
  entitiesTableBodyRows?: ITableRow[];
  fieldsTableBodyRows?: ITableRow[];
  dataTableColumns?: ITableColumn[];
  dataTableHeadRows?: ITableRow[];
  dataTableBodyRows?: ITableRow[];
  dataTableFootRows?: ITableRow[];
}

interface IERModelBoxActionsProps {
  loadErModel: () => void;
  loadData?: () => void;
}

type TERModelBoxProps = IERModelBoxStateProps & IERModelBoxSelectorProps & IERModelBoxActionsProps;

// @CSSModules(commonStyle) FIXME webpack modules in styles
@CSSModules(styles)
class ERModelBox extends PureComponent<TERModelBoxProps, {}> {
  public render(): JSX.Element {
    console.log('render ERModelBox');

    const {
      erModel,
      err,
      loadErModel,
      loadData,
      entitiesTableColumns,
      entitiesTableHeadRows,
      entitiesTableBodyRows,
      // entitiesTableFootRows,
      fieldsTableColumns,
      fieldsTableHeadRows,
      fieldsTableBodyRows,
      // fieldsTableFootRows,
      dataTableColumns,
      dataTableHeadRows,
      dataTableBodyRows
      // dataTableFootRows
    } = this.props;

    return (
      <Fragment>
        <div>{err && `ERROR: ${err}`}</div>
        <div>{`загружено сущностей: ${Object.entries(erModel.entities).length}`}</div>

        <Button style={{ margin: 60 }} onClick={loadErModel}>
          Load ER-Model
        </Button>
        <Button style={{ margin: 60 }} onClick={!loadData ? () => ({}) : loadData} disabled={!loadData}>
          Load Entity-Data
        </Button>

        <div className="row-flex" style={{ display: 'flex' }}>
          <InfiniteTableLayout
            tableHeight={'60vh'}
            headRows={entitiesTableHeadRows}
            columns={entitiesTableColumns}
            bodyRows={entitiesTableBodyRows}
            renderScrollContainer={ERModelBox.renderScrollContainer}
            renderHeadCell={ERModelBox.renderHeadCell}
            renderBodyCell={ERModelBox.renderBodyCell}
            renderRow={ERModelBox.renderEntitiesTableRow}
            //
            tableHeightPx={0}
            tableMinWidthPx={0}
          />
          <InfiniteTableLayout
            tableHeight={'60vh'}
            headRows={fieldsTableHeadRows}
            columns={fieldsTableColumns}
            bodyRows={fieldsTableBodyRows}
            renderScrollContainer={ERModelBox.renderScrollContainer}
            renderHeadCell={ERModelBox.renderHeadCell}
            renderBodyCell={ERModelBox.renderBodyCell}
            renderRow={ERModelBox.renderFieldsTableRow}
            //
            tableHeightPx={0}
            tableMinWidthPx={0}
          />
          <InfiniteTableLayout
            tableHeight={'60vh'}
            headRows={dataTableHeadRows}
            columns={dataTableColumns}
            bodyRows={dataTableBodyRows}
            renderScrollContainer={ERModelBox.renderScrollContainer}
            renderHeadCell={ERModelBox.renderHeadCell}
            renderBodyCell={ERModelBox.renderBodyCell}
            renderRow={ERModelBox.renderDataTableRow}
            //
            tableHeightPx={0}
            tableMinWidthPx={0}
          />
        </div>
      </Fragment>
    );
  }

  private static renderBodyCellContent: SFC<any> = ({ column, rowData }) => {
    if (!rowData || !column || !rowData[column.id]) return <Fragment>{'[ null ]'}</Fragment>;

    return <Fragment>{`${rowData[column.id]}`}</Fragment>;
  };

  private static renderHeadCellContent: SFC<any> = ({ column, rowData }) => {
    if (!rowData || !column || !rowData[column.id]) return <Fragment>{'[ no-data ]'}</Fragment>;

    return <Fragment>{rowData[column.id].title}</Fragment>;
  };

  public static renderScrollContainer: SFC<any> = ({ style, ...props }) => (
    <Paper style={{ flex: 1, ...style }} {...props} />
  );

  public static renderHeadCell: SFC<any> = ({ column, rowData, ...props }) => (
    <TableCell
      renderContent={contentProps => (
        <ERModelBox.renderHeadCellContent column={column} rowData={rowData} {...contentProps} />
      )}
      column={column}
      {...props}
    />
  );

  public static renderBodyCell: SFC<any> = ({ column, rowData, ...props }) => {
    return (
      <TableCell
        renderContent={(contentProps: any) => (
          <ERModelBox.renderBodyCellContent column={column} rowData={rowData} {...contentProps} />
        )}
        column={column}
        {...props}
      />
    );
  };

  private static SelectableRow = withProps({
    renderSelectorCell: TableSelectorCell,
    role: 'checkbox',
    hover: true,
    tabIndex: -1
  })(withSelectorSelection<TTableRowProps>(TableRow) as any);

  private static renderEntitiesTableRow = pure(
    connect(
      (state, props) => {
        return {
          selected: entitiesSelectedRowSelector(state, props),
          'aria-checked': entitiesSelectedRowSelector(state, props)
        };
      },
      (dispatch, props) => ({ onSelectionToggle: bindActionCreators(actions.singleselectToggleEntitiesRow, dispatch) })
    )(ERModelBox.SelectableRow)
  );

  private static renderFieldsTableRow = pure(
    connect(
      (state, props) => {
        return {
          selected: fieldsSelectedRowSelector(state, props),
          'aria-checked': fieldsSelectedRowSelector(state, props)
        };
      },
      (dispatch, props) => ({ onSelectionToggle: bindActionCreators(actions.multiselectToggleFieldsRow, dispatch) })
    )(ERModelBox.SelectableRow)
  );

  private static renderDataTableRow = pure(TableRow);
}

export { ERModelBox, TERModelBoxProps, IERModelBoxStateProps, IERModelBoxSelectorProps, IERModelBoxActionsProps };

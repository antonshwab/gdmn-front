import React, { Component, Fragment, Key, PureComponent, ReactType } from 'react';
import { List, AutoSizer, WindowScroller } from 'react-virtualized';

import {
  IInfiniteTableLayoutProps,
  InfiniteTableLayout,
  ITableColumn,
  TableLayout as CoreTableLayout
} from '@src/app/scenes/ermodel/components/data-grid-core';

class InfiniteTableLayout2 extends Component<IInfiniteTableLayoutProps, any> {
  public static defaultProps = {
    ...InfiniteTableLayout.defaultProps
  };

  constructor(props: IInfiniteTableLayoutProps) {
    super(props);

    this.getMinWidth = this.getMinWidth.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  private getMinWidth(columns: ITableColumn[]): number {
    const { minColumnWidthPx } = this.props;

    return (
      columns
        .map(column => CoreTableLayout.getColumnWidthPx(column, minColumnWidthPx))
        .reduce((acc, width) => acc + width, 0) || 0
    );
  }

  private rowRenderer({ key, index, isScrolling, isVisible, style }: any) {
    // console.log('_rowRenderer');

    const { renderRow: Row, renderBodyCell: BodyCell } = this.props;

    if (!(!!Row && !!BodyCell)) return <Fragment />; // todo tmp

    return (
      <Row key={key} uid={this.props.bodyRows![index].id} style={style}>
        {this.props!.columns!.map((column, i) => {
          const width = i === this.props!.columns!.length - 1 ? '100%' : CoreTableLayout.getColumnWidthPx(column);
          return (
            <BodyCell
              key={column.id}
              column={column}
              rowData={this.props.bodyRows![index]}
              style={{
                maxWidth: width,
                minWidth: width,
                width
              }}
            />
          );
        })}
      </Row>
    );
  }

  public render(): JSX.Element {
    const {
      columns = [],
      headRows = [],
      bodyRows,
      // footRows,
      renderTable: Table,
      renderHead: Head,
      renderBody: Body,
      // renderFoot: Foot,
      renderRow: Row,
      renderHeadCell: HeadCell,
      renderBodyCell: BodyCell,
      // renderFootCell: FootCell,
      // renderColGroup: ColGroup,
      renderColGroupCol: Col,
      renderScrollContainer: ScrollContainer,
      tableHeight,
      //
      rowHeightPx,
      renderHeadTable: HeadTable,
      renderBodyTable: BodyTable
    } = this.props;

    // const BodyTable = 'div'; // TODO
    // console.log('render CoreTableLayout');

    const minWidth = this.getMinWidth(columns);

    // Math.min(height, rowHeight * bodyRows!.length)

    // console.log(columns);

    if (!(ScrollContainer && Table && Col && Row && Body && BodyCell && BodyTable)) return <Fragment />; // TODO

    return (
      <ScrollContainer style={{ overflow: 'auto' }}>
        {!!headRows.length &&
          HeadTable &&
          Head &&
          HeadCell && (
            <HeadTable style={{ minWidth }}>
              {/*{ColGroup && (*/}
              {/*<ColGroup>*/}
              {/*{columns.map(column => <Col key={column.id} style={{ width: column.widthPx }} column={column} />)}*/}
              {/*</ColGroup>*/}
              {/*)}*/}
              <Head>
                {!!headRows &&
                  headRows.map(row => (
                    <Row key={row.id}>
                      {HeadCell && columns.map(column => <HeadCell key={column.id} column={column} rowData={row} />)}
                    </Row>
                  ))}
              </Head>
            </HeadTable>
          )}
        <BodyTable style={{ minWidth }}>
          {/*{ColGroup && (*/}
          {/*<ColGroup>*/}
          {/*{columns.map(column => (<Col key={column.id} style={{ width: column.widthPx }} column={column} />))}*/}
          {/*</ColGroup>*/}
          {/*)}*/}
          <Body>
            {/*<InfiniteLoader*/}
            {/*isRowLoaded={this.isRowLoaded}*/}
            {/*loadMoreRows={this.loadMoreRows}*/}
            {/*rowCount={bodyRowsTotal}*/}
            {/*ref={ref => this.infiniteLoader = ref}*/}
            {/*>*/}
            {/*{({ onRowsRendered, registerChild }) => (*/}
            {/*<WindowScroller>*/}
            {/*{({ height, scrollTop }) => (*/}

            <div style={{ height: tableHeight, width: '100%' }}>
              <AutoSizer>
                {({ width, height }) => (
                  // <div ref={registerChild as any}>
                  <List
                    // ref={this.setListComponent}
                    // autoHeight={true}
                    // autoWidth={true}
                    width={width}
                    height={height}
                    rowCount={bodyRows!.length}
                    rowHeight={
                      rowHeightPx!
                      // useDynamicRowHeight ? this.getRowHeight : rowHeight
                    }
                    // isScrolling={isScrolling}
                    // onScroll={onChildScroll}
                    // scrollTop={scrollTop}
                    // scrollToIndex={scrollToIndex}
                    rowRenderer={this.rowRenderer}
                    overscanRowCount={10}
                    // onRowsRendered={onRowsRendered}
                  />
                  // </div>
                )}
              </AutoSizer>
            </div>
            {/*)}*/}
            {/*</WindowScroller>*/}
            {/*)}*/}
            {/*</InfiniteLoader>*/}
          </Body>
        </BodyTable>

        {/*{Foot && (*/}
        {/*<Foot>*/}
        {/*{!!footRows &&*/}
        {/*footRows.map(row => (*/}
        {/*<Row key={row.id}>*/}
        {/*{FootCell && columns.map(column => <FootCell key={column.id} column={column} rowData={row} />)}*/}
        {/*</Row>*/}
        {/*))}*/}
        {/*</Foot>*/}
        {/*)}*/}
      </ScrollContainer>
    );
  }
}

export { InfiniteTableLayout2, IInfiniteTableLayoutProps as IInfiniteTableLayoutProps2 };
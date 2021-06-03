import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const ModalDetails = ({currentProduct, currentProductStyles, relatedItemsStyles, name, currentProductId, category, price, features}) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  const createData = (compare_item_details, comparison, current_item_details) => {
    if(!Array.isArray(compare_item_details) && !Array.isArray(current_item_details)) {
      return { compare_item_details, comparison, current_item_details}
    }

    let compareItemFeature = '❌';
    let currentItemFeature = '❌';

    for (let i = 0; i < compare_item_details.length; i++) {
      if (compare_item_details[i].feature === comparison) {
        compareItemFeature = compare_item_details[i].value
        break;
      }
    }
    for (let j = 0; j < current_item_details.length; j++) {
      if (current_item_details[j].feature === comparison) {
        currentItemFeature = current_item_details[j].value
        break;
      }
    }

    if (compareItemFeature === '❌' && currentItemFeature === '❌') {
      return;
    } else return { compare_item_details: compareItemFeature, comparison, current_item_details: currentItemFeature};
  };

  const rows = [
    createData(category, 'Category', currentProduct.category),
    createData(price, 'Price', currentProduct.default_price),
    createData(features.length, '# of Features', currentProduct['features'].length),
    createData(features, 'Sole', currentProduct['features']),
    createData(features, 'Material', currentProduct['features']),
    createData(features, 'Mid-Sole', currentProduct['features']),
    createData(features, 'Stitching', currentProduct['features']),
    createData(features, 'Lenses', currentProduct['features']),
    createData(features, 'UV Protection', currentProduct['features']),
    createData(features, 'Frames', currentProduct['features']),
    createData(features, 'Fabric', currentProduct['features']),
    createData(features, 'Button', currentProduct['features']),
    createData(features, 'Cut', currentProduct['features']),
    createData(relatedItemsStyles.results.length, '# of Styles', currentProductStyles.results.length),
    createData(relatedItemsStyles.results[0].name, 'Style Name', currentProductStyles.results[0].name),
  ];

  let compareRows = rows.filter (row => row !== undefined);

  return (
    <>
    {compareRows.length &&
      <TableContainer className = 'scroll-table'>
        <Table className={classes.table} stickyHeader = {true} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style ={{fontSize: 22}}>{name}</TableCell>
              <TableCell align="center" style ={{padding: 40}}></TableCell>
              <TableCell align="center" style ={{fontSize: 22}}>{currentProduct.name}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compareRows.map((row, index) => (
              <TableRow key = {index}>
                <TableCell align="center" style ={{fontSize: 16}}>{row.compare_item_details}</TableCell>
                <TableCell align="center" style ={{fontSize: 16}}>{row.comparison}</TableCell>
                <TableCell align="center" style ={{fontSize: 16}}>{row.current_item_details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
  </>
  );
}

export default ModalDetails;
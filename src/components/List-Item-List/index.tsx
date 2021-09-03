// import * as React from 'react'
// import {BookListUL} from '@app/components/lib/index'
// import {BookRow} from '@app/components/Book-Row/index'
// import {useListBookItemList} from '@app/hooks/book'
// import {EmotionJSX} from '@emotion/react/types/jsx-namespace'

// function ListItemList({
//   user,
//   filterListItems,
//   noListItems,
//   noFilteredListItems,
// }): EmotionJSX.Element {
//   const {data: listItems} = useListBookItemList()
//   const filteredListItems = Array.isArray(listItems)
//     ? listItems.filter(filterListItems)
//     : []

//   if (!listItems?.length) {
//     return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
//   }
//   if (!filteredListItems.length) {
//     return (
//       <div css={{marginTop: '1em', fontSize: '1.2em'}}>
//         {noFilteredListItems}
//       </div>
//     )
//   }

//   return (
//     <BookListUL>
//       {filteredListItems.map(listItem => (
//         <li key={listItem.id}>
//           <BookRow book={listItem.book} />
//         </li>
//       ))}
//     </BookListUL>
//   )
// }

// export {ListItemList}

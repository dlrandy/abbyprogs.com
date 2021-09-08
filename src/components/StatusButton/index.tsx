import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import {Tooltip} from '@chakra-ui/react'
import * as colors from '@app/styles/colors'
import {useAsync} from '@app/utils/hooks'
import {CircleButton, Spinner} from '@app/components/lib/index'
import {
  useQuery,
  useMutation,
  UseQueryResult,
  useQueryClient,
  QueryClient,
  UseMutationResult,
} from 'react-query'
import {
  useListBookItemCreate,
  useListBookItemDelete,
  useListBookItemList,
  useListBookItemUpdate,
} from '@app/hooks/book'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({book}) {
  const {data} = useListBookItemList()
  const listItems = data?.listBooks
  const listItem = listItems?.find(li => li.bookId === book.id) ?? null

  const listBookUpdater = useListBookItemUpdate()

  const listBookRemover = useListBookItemDelete()

  const listBookCreator = useListBookItemCreate()
  return (
    <React.Fragment>
      {listItem ? (
        listItem.finishDate ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={() =>
              listBookUpdater.mutate({id: listItem.id, finishDate: null})
            }
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() =>
              listBookUpdater.mutate({id: listItem.id, finishDate: Date.now()})
            }
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => listBookRemover.mutate({id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => listBookCreator.mutate({bookId: book.id})}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}

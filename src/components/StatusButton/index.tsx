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
  useCreateListItem,
  useRemoveListItem,
  useListItem,
  useUpdateListItem,
} from '@app/hooks/book/listItem'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'

type TooltipButtonProps = {
  label: string
  highlight: string
  onClick: () => Promise<unknown>
  icon: React.ReactNode
}

function TooltipButton({
  label,
  highlight,
  onClick,
  icon,
  ...rest
}: TooltipButtonProps) {
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

type StatusButtonsProps = {
  book: ReadBook
}

function StatusButtons({book}: StatusButtonsProps): EmotionJSX.Element {
  const listItem = useListItem(book)
  const listBookUpdater = useUpdateListItem()

  const listBookRemover = useRemoveListItem()

  const listBookCreator = useCreateListItem()
  return (
    <React.Fragment>
      {listItem ? (
        listItem.finishDate ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={async () =>
              listBookUpdater.mutate({id: listItem.id, finishDate: undefined})
            }
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={async () =>
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
          onClick={async () => listBookRemover.mutate({id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={async () => listBookCreator.mutate({bookId: book.id})}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}

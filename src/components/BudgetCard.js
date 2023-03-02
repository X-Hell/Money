import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-4">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            animated now={amount}
            label={`${getLabel(amount, max)}%`}
          /> 
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              + Expense
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-secondary">
               View
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.25) return "info"
  if (ratio < 0.5) return "success"
  if (ratio < 0.75) return "warning"
  return "danger"
}

function getLabel(amount, max) {
  return amount / max * 100
}
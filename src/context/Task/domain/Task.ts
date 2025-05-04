import { CreatedOnValueObject } from '../../Shared/domain/value-object/CreatedOnValueObject'
import { UpdatedOnValueObject } from '../../Shared/domain/value-object/UpdatedOn'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { TaskDescription } from './value-object/TaskDescription'
import { TaskTitle } from './value-object/TaskTitle'

interface TaskPrimitives {
  id: string
  title: string
  description: string
  creator: string
  createdOn: string
  updatedOn: string
}

export class Task {
  readonly id: Uuidv7
  readonly title: TaskTitle
  readonly description: TaskDescription
  readonly creator: Uuidv7
  readonly createdOn: CreatedOnValueObject
  readonly updatedOn: UpdatedOnValueObject

  constructor(
    id: Uuidv7,
    title: TaskTitle,
    description: TaskDescription,
    creator: Uuidv7,
    createdOn?: CreatedOnValueObject,
    updatedOn?: UpdatedOnValueObject,
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.creator = creator
    this.createdOn = createdOn ?? new CreatedOnValueObject()
    this.updatedOn = updatedOn ?? new UpdatedOnValueObject()
  }

  static create(title: TaskTitle, description: TaskDescription, creator: Uuidv7): Task {
    const id = Uuidv7.random()
    return new Task(id, title, description, creator)
  }

  static fromPrimitives({
    id,
    title,
    description,
    creator,
    createdOn,
    updatedOn,
  }: TaskPrimitives): Task {
    const idVO = new Uuidv7(id)
    const titleVO = new TaskTitle(title)
    const descriptionVO = new TaskDescription(description)
    const creatorVO = new Uuidv7(creator)
    const createdOnVO = new CreatedOnValueObject(new Date(createdOn))
    const updatedOnVO = new UpdatedOnValueObject(new Date(updatedOn))
    return new Task(idVO, titleVO, descriptionVO, creatorVO, createdOnVO, updatedOnVO)
  }

  toPrimitives(): TaskPrimitives {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      creator: this.creator.value,
      createdOn: this.createdOn.value.toISOString(),
      updatedOn: this.updatedOn.value.toISOString(),
    }
  }
}

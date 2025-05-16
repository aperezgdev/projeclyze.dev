import { CreatedOnValueObject } from '../../Shared/domain/value-object/CreatedOnValueObject'
import { UpdatedOnValueObject } from '../../Shared/domain/value-object/UpdatedOn'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { ProjectDescription } from './value-object/ProjectDescription'
import { ProjectMembers } from './value-object/ProjectMembers'
import { ProjectTitle } from './value-object/ProjectTitle'

interface ProjectPrimitives {
  id: string
  title: string
  description: string
  owner: string
  createdOn: string
  updatedOn: string
}

export class Project {
  id: Uuidv7
  title: ProjectTitle
  description: ProjectDescription
  owner: Uuidv7
  members: ProjectMembers
  createdOn: CreatedOnValueObject
  updatedOn: UpdatedOnValueObject

  constructor(
    id: Uuidv7,
    title: ProjectTitle,
    description: ProjectDescription,
    owner: Uuidv7,
    members: ProjectMembers,
    createdOn?: CreatedOnValueObject,
    updatedOn?: UpdatedOnValueObject,
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.owner = owner
    this.members = members
    this.createdOn = createdOn ?? new CreatedOnValueObject()
    this.updatedOn = updatedOn ?? new UpdatedOnValueObject()
  }

  static create(title: string, description: string, owner: string): Project {
    const id = Uuidv7.random()
    const ownerVO = new Uuidv7(owner)
    return new Project(
      id,
      new ProjectTitle(title),
      new ProjectDescription(description),
      ownerVO,
      new CreatedOnValueObject(),
      new UpdatedOnValueObject(),
    )
  }

  update({
    title,
    description,
    owner,
  }: {
    title?: ProjectTitle
    description?: ProjectDescription
    owner?: Uuidv7
  }): Project {
    const titleVO = title ? title : this.title
    const descriptionVO = description ? description : this.description
    const ownerVO = owner ? owner : this.owner

    return new Project(
      this.id,
      titleVO,
      descriptionVO,
      ownerVO,
      this.createdOn,
      new UpdatedOnValueObject(),
    )
  }

  addMember(member: Uuidv7): Project {
    return new Project(
      this.id,
      this.title,
      this.description,
      this.me,
      this.createdOn,
      this.updatedOn,
    )
  }

  toPrimitives(): ProjectPrimitives {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      owner: this.owner.value,
      createdOn: this.createdOn.value.toISOString(),
      updatedOn: this.updatedOn.value.toISOString(),
    }
  }

  static fromPrimitives({
    id,
    title,
    description,
    owner,
    createdOn,
    updatedOn,
  }: ProjectPrimitives): Project {
    const idVO = new Uuidv7(id)
    const ownerVO = new Uuidv7(owner)
    return new Project(
      idVO,
      new ProjectTitle(title),
      new ProjectDescription(description),
      ownerVO,
      new CreatedOnValueObject(new Date(createdOn)),
      new UpdatedOnValueObject(new Date(updatedOn)),
    )
  }
}

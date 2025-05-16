import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Project } from '../domain/Project'
import { ProjectFinder } from '../domain/ProjectFinder'
import { ProjectRepository } from '../domain/ProjectRepository'
import { ProjectDescription } from '../domain/value-object/ProjectDescription'
import { ProjectTitle } from '../domain/value-object/ProjectTitle'

export class ProjectUpdater {
  constructor(
    private repository: ProjectRepository,
    private finder: ProjectFinder,
  ) {
    this.finder = new ProjectFinder(repository)
  }

  async run({
    id,
    title,
    description,
    owner,
  }: {
    id: string
    title: string
    description: string
    owner: string
  }): Promise<Project> {
    const project = await this.finder.run({ id: id })

    const titleVO = new ProjectTitle(title)
    const descriptionVO = new ProjectDescription(description)
    const ownerVO = new Uuidv7(owner)

    const projectUpdated = project.update({
      title: titleVO,
      description: descriptionVO,
      owner: ownerVO,
    })

    return this.repository.update(projectUpdated)
  }
}

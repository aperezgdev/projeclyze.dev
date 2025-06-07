import { Logger } from '@projeclyze/context/Shared/domain/Logger'
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
    private logger: Logger
  ) {
    this.finder = new ProjectFinder(repository, logger)
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
    this.logger.log(`Updating project with id: ${id}, title: ${title}, description: ${description}, owner: ${owner}`)
    const project = await this.finder.run({ id: id })
    

    const titleVO = new ProjectTitle(title)
    const descriptionVO = new ProjectDescription(description)
    const ownerVO = new Uuidv7(owner)

    const projectUpdated = project.update({
      title: titleVO,
      description: descriptionVO,
      owner: ownerVO,
    })
    this.logger.log(`Project with id: ${id} updated successfully`)

    return await this.repository.update(projectUpdated)
  }
}

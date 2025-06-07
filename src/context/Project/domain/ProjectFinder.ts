import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { NotExistError } from '../../Shared/domain/NotExistError'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Project } from './Project'
import { ProjectRepository } from './ProjectRepository'

export class ProjectFinder {
  constructor(private repository: ProjectRepository, private readonly logger: Logger) {}

  async run({ id }: { id: string }): Promise<Project> {
    this.logger.log(`Finding project with id: ${id}`)
    const projectId = new Uuidv7(id)

    const project = await this.repository.findById(projectId)
    if (!project.isPresent()) {
      this.logger.error(`Project with id ${id} not found`)
      throw new NotExistError(`Project with id ${id} not found`)
    }

    this.logger.log(`Project with id ${id} found`)
    this.logger.log(`Project details: ${JSON.stringify(project.get())}`)

    return project.get()
  }
}

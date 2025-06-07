import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Project } from '../domain/Project'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectOwnerSearcher {
  constructor(private repository: ProjectRepository, private logger: Logger) {}

  async run(ownerId: string): Promise<Project[]> {
    const ownerIdVO = new Uuidv7(ownerId)
    this.logger.log(`Searching projects for owner: ${ownerIdVO.value}`)
    const projects = await this.repository.findByOwner(ownerIdVO)
    this.logger.log(`Found ${projects.length} projects for owner: ${ownerIdVO.value}`)
    return projects
  }
}

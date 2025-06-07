import { Logger } from '@projeclyze/context/Shared/domain/Logger';
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { ProjectFinder } from '../domain/ProjectFinder'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectAddMember {
  constructor(
    readonly repository: ProjectRepository,
    readonly finder: ProjectFinder,
    readonly logger: Logger
  ) {
    this.finder = new ProjectFinder(repository, logger)
  }

  async run({ member, project }: { project: string; member: string }) {
    this.logger.log(`Adding member ${member} to project ${project}`)
    const result = await this.finder.run({ id: project })
    this.logger.log(`Project ${project} found, adding member ${member}`)
    const projectWithMember = result.addMember(new Uuidv7(member))
    await this.repository.update(projectWithMember)
  }
}

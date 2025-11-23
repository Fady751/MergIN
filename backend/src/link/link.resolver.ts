import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Link } from 'src/GraphQLSchemas/link.model';
import { LinkService } from './link.service';
import { CreateLinkInput } from './DTOs/Create-links.dto';

@Resolver()
@Resolver(() => Link)
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Mutation(() => Link)
  addLink(@Args('createLinkInput') createLinkInput: CreateLinkInput) {
    // return this.linkService.create(createLinkInput);
  }

  @Mutation(() => Link)
  deleteLink(@Args('id', { type: () => Int }) id: number) {
    // return this.linkService.delete(id);
  }

//   @Mutation(() => Link)
//   updateLink(@Args('id', { type: () => Int }) id: number, @Args('updateLinkInput') updateLinkInput: UpdateLinkInput) {
//     // return this.linkService.update(id, updateLinkInput);
//   }
}
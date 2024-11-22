
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .models import User
from .serializers import UserProfileSerializer
class RegisterUserView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    def post(self, request):

        # if email is already in use
        if User.objects.filter(email=request.data['email']).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = UserProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request):
        serializer = UserProfileSerializer(request.user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # update user profile image
    def patch(self, request):

        user = User.objects.get(email=request.user.email)

        updated_fields = []

        if user.faculty != request.data.get('faculty', user.faculty):
            user.faculty = request.data.get('faculty', user.faculty)
            updated_fields.append('faculty')
        if user.images != request.data.get('images', user.images):
            user.images = request.data.get('images', user.images)
            updated_fields.append('images')
        if user.dob != request.data.get('dob', user.dob):
            user.dob = request.data.get('dob', user.dob)
            updated_fields.append('dob')
        if user.balance != request.data.get('balance', user.balance):
            user.balance = request.data.get('balance', user.balance)
            updated_fields.append('balance')

        if user.phone_number != request.data.get('phone_number', user.phone_number):
            user.phone_number = request.data.get('phone_number', user.phone_number)
            updated_fields.append('phone_number')

        if updated_fields:
            user.save()
            return Response({'message': f'Updated: {", ".join(updated_fields)}'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No updates made'}, status=status.HTTP_200_OK)

class BalanceView(APIView):
    permission_classes = {}
    def get(self, request):
        if "email" not in request.data:
            return Response({'message': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=request.data['email'])
        except User.DoesNotExist:
            return Response({'message': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'balance': user.balance}, status=status.HTTP_200_OK)
class DeleteView(APIView):
    permission_classes = (IsAdminUser,)
    def delete(self, request):
        if "email" not in request.data:
            return Response({'message': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user  = User.objects.get(email=request.data['email'])
        except User.DoesNotExist:
            return Response({'message': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        if user.is_superuser:
            return Response({'message': 'Cannot delete admin user.'}, status=status.HTTP_400_BAD_REQUEST)
        temp  = user.email
        user.delete()
        return Response({'message': f"Deleted user with email:{temp}"}, status=status.HTTP_200_OK)
class AllUsersView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request):
        mssv = request.data.get('mssv', None)
        email = request.data.get('email', None)

        if not mssv and not email:
            users = User.objects.all()
        else:
            if mssv:
                users = User.objects.filter(mssv=mssv)
            elif email:
                users = User.objects.filter(email=email)

        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        if 'email' not in request.data:
            return Response({'message': 'Email is required.'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=request.data['email'])
        except User.DoesNotExist:
            return Response({'message': 'User with this email does not exist.'},
                            status=status.HTTP_404_NOT_FOUND)


        updated_fields = []

        if user.faculty != request.data.get('faculty', user.faculty):
            user.faculty = request.data.get('faculty', user.faculty)
            updated_fields.append('faculty')
        if user.images != request.data.get('images', user.images):
            user.images = request.data.get('images', user.images)
            updated_fields.append('images')
        if user.dob != request.data.get('dob', user.dob):
            user.dob = request.data.get('dob', user.dob)
            updated_fields.append('dob')
        if user.balance != request.data.get('balance', user.balance):
            user.balance = request.data.get('balance', user.balance)
            updated_fields.append('balance')

        if user.phone_number != request.data.get('phone_number', user.phone_number):
            user.phone_number = request.data.get('phone_number', user.phone_number)
            updated_fields.append('phone_number')

        if updated_fields:
            user.save()
            return Response({'message': f'Updated: {", ".join(updated_fields)}'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No updates made'}, status=status.HTTP_200_OK)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['password'] = user.password
        token['role'] = "admin" if user.is_superuser else "customer"


        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'login',
        'login/refresh'
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNote(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many = True)
    return Response(serializer.data)